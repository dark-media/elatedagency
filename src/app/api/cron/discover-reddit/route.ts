import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { scoreProspect } from "@/lib/lead-scoring";

export const maxDuration = 120;

const SUBREDDITS = [
  "onlyfansadvice",
  "CreatorsAdvice",
  "onlyfanspromotion",
  "onlyfans101",
  "FanslyAdvice",
  "Fansly_Advice",
  "contentcreators",
  "onlyfansgirls101",
  "OnlyFansReviews",
  "onlyfanshottest",
];

const SEARCH_QUERIES = [
  "management agency",
  "need help growing",
  "looking for manager",
  "how to grow onlyfans",
  "struggling to grow",
  "onlyfans tips",
  "chatting agency",
  "need a manager",
  "how to get more subscribers",
  "promoting onlyfans",
  "not making money",
  "help with onlyfans",
  "agency worth it",
  "revenue growth",
  "first month onlyfans",
  "new creator advice",
];

interface RedditPost {
  data: {
    id: string;
    author: string;
    title: string;
    selftext: string;
    subreddit: string;
    permalink: string;
    created_utc: number;
    url: string;
  };
}

async function fetchWithRetry(
  url: string,
  userAgent: string,
  maxRetries: number = 2
): Promise<{ data: RedditPost[]; status: number } | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": userAgent },
      });

      if (res.status === 429) {
        // Rate limited - wait longer and retry
        const retryAfter = parseInt(res.headers.get("retry-after") || "5");
        const waitTime = Math.max(retryAfter * 1000, 3000 * (attempt + 1));
        await new Promise((r) => setTimeout(r, waitTime));
        continue;
      }

      if (!res.ok) {
        return { data: [], status: res.status };
      }

      const json = await res.json();
      const posts: RedditPost[] = json?.data?.children || [];
      return { data: posts, status: res.status };
    } catch {
      if (attempt === maxRetries) return null;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userAgent =
    process.env.REDDIT_USER_AGENT ||
    "Mozilla/5.0 (compatible; ContentBot/1.0; +https://elatedagency.com)";
  let totalFound = 0;
  let totalCreated = 0;
  const errors: string[] = [];
  const statusCodes: Record<string, number> = {};

  // Strategy 1: Browse "new" posts in high-intent subreddits (most reliable)
  // Do this FIRST since it's most likely to succeed
  for (const subreddit of SUBREDDITS) {
    const result = await fetchWithRetry(
      `https://www.reddit.com/r/${subreddit}/new.json?limit=100`,
      userAgent
    );

    if (!result) {
      errors.push(`New r/${subreddit}: fetch failed`);
      continue;
    }

    statusCodes[`new_${subreddit}`] = result.status;

    if (result.data.length > 0) {
      totalFound += result.data.length;
      for (const post of result.data) {
        const created = await processPost(post, subreddit);
        if (created) totalCreated++;
      }
    }

    // 2 second delay between subreddits to be gentle with Reddit
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Strategy 2: Search with high-intent queries across selected subreddits
  // Pick fewer queries to stay within rate limits
  const shuffled = [...SEARCH_QUERIES].sort(() => Math.random() - 0.5);
  const selectedQueries = shuffled.slice(0, 5);
  const searchSubs = ["onlyfansadvice", "CreatorsAdvice", "onlyfans101"];

  for (const subreddit of searchSubs) {
    for (const query of selectedQueries) {
      const result = await fetchWithRetry(
        `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new&limit=25&t=month`,
        userAgent
      );

      if (!result) {
        errors.push(`Search r/${subreddit} "${query}": fetch failed`);
        continue;
      }

      statusCodes[`search_${subreddit}_${query.slice(0, 15)}`] = result.status;

      if (result.data.length > 0) {
        totalFound += result.data.length;
        for (const post of result.data) {
          const created = await processPost(post, subreddit);
          if (created) totalCreated++;
        }
      }

      // 2 second delay between requests
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Strategy 3: Cross-Reddit search for highest-intent queries
  const crossRedditQueries = [
    "onlyfans management agency",
    "onlyfans need manager",
    "looking for onlyfans manager",
  ];

  for (const query of crossRedditQueries) {
    const result = await fetchWithRetry(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&limit=25&t=month`,
      userAgent
    );

    if (!result) {
      errors.push(`Cross-Reddit "${query}": fetch failed`);
      continue;
    }

    statusCodes[`cross_${query.slice(0, 20)}`] = result.status;

    if (result.data.length > 0) {
      totalFound += result.data.length;
      for (const post of result.data) {
        const created = await processPost(post, post.data.subreddit);
        if (created) totalCreated++;
      }
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  // Log discovery run
  await prisma.discoveryLog.create({
    data: {
      platform: "reddit",
      query: `${SUBREDDITS.length} subs new + ${searchSubs.length}×${selectedQueries.length} search + ${crossRedditQueries.length} cross`,
      resultsFound: totalFound,
      prospectsCreated: totalCreated,
    },
  });

  return NextResponse.json({
    success: true,
    found: totalFound,
    created: totalCreated,
    statusCodes,
    errors: errors.length > 0 ? errors : undefined,
  });
}

async function processPost(
  post: RedditPost,
  subreddit: string
): Promise<boolean> {
  const { author, title, selftext, permalink } = post.data;

  // Skip deleted/removed/bot authors
  if (
    !author ||
    author === "[deleted]" ||
    author === "AutoModerator" ||
    author === "[removed]"
  ) {
    return false;
  }

  // Check if we already have this prospect
  const existing = await prisma.prospect.findFirst({
    where: { platform: "reddit", username: author },
  });
  if (existing) return false;

  const fullContent = `${title} ${selftext}`;

  // Skip very short posts (likely spam/low-effort)
  if (fullContent.length < 30) return false;

  const hasOnlyFansLink = /onlyfans\.com/.test(fullContent);
  const mentionsEarnings = /\$\d+|\d+k|\bearning|\brevenue\b/i.test(
    fullContent
  );
  const mentionsManagement = /\b(management|manager|agency)\b/i.test(
    fullContent
  );

  const score = scoreProspect({
    postContent: fullContent,
    subreddit: subreddit,
    hasOnlyFansLink,
    mentionsEarnings,
    mentionsManagement,
  });

  // Save any prospect with score >= 10 (we can filter later)
  if (score < 10) return false;

  await prisma.prospect.create({
    data: {
      platform: "reddit",
      username: author,
      profileUrl: `https://reddit.com/u/${author}`,
      discoveredFrom: subreddit,
      postContent: fullContent.slice(0, 2000),
      postUrl: `https://reddit.com${permalink}`,
      score,
      status: score >= 60 ? "qualified" : "new",
    },
  });

  return true;
}
