import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { scoreProspect } from "@/lib/lead-scoring";

export const maxDuration = 60;

const SUBREDDITS = [
  "onlyfansadvice",
  "CreatorsAdvice",
  "onlyfanspromotion",
  "onlyfans101",
];

const SEARCH_QUERIES = [
  "management agency",
  "need help growing",
  "looking for manager",
  "how to grow onlyfans",
  "struggling to grow",
  "onlyfans tips",
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

  for (const subreddit of SUBREDDITS) {
    // Pick a random search query for variety
    const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];

    try {
      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=new&limit=25&t=week`,
        {
          headers: { "User-Agent": userAgent },
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const posts: RedditPost[] = data?.data?.children || [];

      totalFound += posts.length;

      for (const post of posts) {
        const { author, title, selftext, subreddit: sub, permalink } = post.data;

        // Skip deleted/removed authors
        if (author === "[deleted]" || author === "AutoModerator") continue;

        // Check if we already have this prospect
        const existing = await prisma.prospect.findFirst({
          where: { platform: "reddit", username: author },
        });
        if (existing) continue;

        const fullContent = `${title} ${selftext}`;
        const hasOnlyFansLink = /onlyfans\.com/.test(fullContent);
        const mentionsEarnings = /\$\d+|\d+k|\bearning|\brevenue\b/i.test(fullContent);
        const mentionsManagement = /\b(management|manager|agency)\b/i.test(fullContent);

        const score = scoreProspect({
          postContent: fullContent,
          subreddit: sub,
          hasOnlyFansLink,
          mentionsEarnings,
          mentionsManagement,
        });

        // Only save prospects with score >= 20
        if (score < 20) continue;

        await prisma.prospect.create({
          data: {
            platform: "reddit",
            username: author,
            profileUrl: `https://reddit.com/u/${author}`,
            discoveredFrom: sub,
            postContent: fullContent.slice(0, 2000),
            postUrl: `https://reddit.com${permalink}`,
            score,
            status: score >= 60 ? "qualified" : "new",
          },
        });

        totalCreated++;
      }
    } catch (error) {
      console.error(`Error searching r/${subreddit}:`, error);
    }
  }

  // Log discovery run
  await prisma.discoveryLog.create({
    data: {
      platform: "reddit",
      query: SEARCH_QUERIES.join(", "),
      resultsFound: totalFound,
      prospectsCreated: totalCreated,
    },
  });

  return NextResponse.json({
    success: true,
    found: totalFound,
    created: totalCreated,
  });
}
