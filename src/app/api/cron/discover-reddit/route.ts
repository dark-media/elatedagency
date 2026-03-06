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

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userAgent = process.env.REDDIT_USER_AGENT || "ElatedAgency/1.0";
  let totalFound = 0;
  let totalCreated = 0;
  const errors: string[] = [];

  // Strategy 1: Search each subreddit with multiple queries
  for (const subreddit of SUBREDDITS) {
    // Pick 3 random queries per subreddit for variety
    const shuffled = [...SEARCH_QUERIES].sort(() => Math.random() - 0.5);
    const queries = shuffled.slice(0, 3);

    for (const query of queries) {
      try {
        const res = await fetch(
          `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new&limit=25&t=month`,
          { headers: { "User-Agent": userAgent } }
        );

        if (!res.ok) continue;

        const data = await res.json();
        const posts: RedditPost[] = data?.data?.children || [];
        totalFound += posts.length;

        for (const post of posts) {
          const created = await processPost(post, subreddit);
          if (created) totalCreated++;
        }
      } catch (error) {
        errors.push(`Search r/${subreddit} "${query}": ${error}`);
      }

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Strategy 2: Browse "new" posts in high-intent subreddits
  const hotSubs = ["onlyfansadvice", "CreatorsAdvice", "onlyfans101", "FanslyAdvice"];
  for (const subreddit of hotSubs) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/new.json?limit=50`,
        { headers: { "User-Agent": userAgent } }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const posts: RedditPost[] = data?.data?.children || [];
      totalFound += posts.length;

      for (const post of posts) {
        const created = await processPost(post, subreddit);
        if (created) totalCreated++;
      }
    } catch (error) {
      errors.push(`New r/${subreddit}: ${error}`);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  // Strategy 3: Search across all of Reddit for high-intent queries
  const crossRedditQueries = [
    "onlyfans management agency",
    "onlyfans need manager",
    "onlyfans struggling to grow",
    "how to promote onlyfans",
  ];

  for (const query of crossRedditQueries) {
    try {
      const res = await fetch(
        `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&limit=25&t=month`,
        { headers: { "User-Agent": userAgent } }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const posts: RedditPost[] = data?.data?.children || [];
      totalFound += posts.length;

      for (const post of posts) {
        const created = await processPost(post, post.data.subreddit);
        if (created) totalCreated++;
      }
    } catch (error) {
      errors.push(`Cross-Reddit "${query}": ${error}`);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  // Log discovery run
  await prisma.discoveryLog.create({
    data: {
      platform: "reddit",
      query: `${SUBREDDITS.length} subs × ${SEARCH_QUERIES.length} queries + new feeds + cross-reddit`,
      resultsFound: totalFound,
      prospectsCreated: totalCreated,
    },
  });

  return NextResponse.json({
    success: true,
    found: totalFound,
    created: totalCreated,
    errors: errors.length > 0 ? errors : undefined,
  });
}

async function processPost(post: RedditPost, subreddit: string): Promise<boolean> {
  const { author, title, selftext, permalink } = post.data;

  // Skip deleted/removed/bot authors
  if (!author || author === "[deleted]" || author === "AutoModerator" || author === "[removed]") {
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
  const mentionsEarnings = /\$\d+|\d+k|\bearning|\brevenue\b/i.test(fullContent);
  const mentionsManagement = /\b(management|manager|agency)\b/i.test(fullContent);

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
