import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const INITIAL_TOPICS = [
  {
    topic: "How to Grow Your OnlyFans from Zero to $10K per Month",
    targetKeywords: "grow onlyfans, onlyfans tips, make money onlyfans",
  },
  {
    topic: "OnlyFans Management Agency vs DIY: What Creators Need to Know",
    targetKeywords: "onlyfans management, onlyfans agency, onlyfans manager",
  },
  {
    topic: "The Ultimate OnlyFans Pricing Strategy for Maximum Revenue",
    targetKeywords: "onlyfans pricing, onlyfans subscription price, ppv pricing",
  },
  {
    topic: "How AI is Revolutionizing OnlyFans Chat Management",
    targetKeywords: "onlyfans chat management, ai chatting, onlyfans automation",
  },
  {
    topic: "Top 10 OnlyFans Marketing Strategies That Actually Work in 2025",
    targetKeywords: "onlyfans marketing, promote onlyfans, onlyfans promotion",
  },
  {
    topic: "OnlyFans Content Calendar: How to Plan a Month of Posts",
    targetKeywords: "onlyfans content calendar, content planning, posting schedule",
  },
  {
    topic: "Understanding OnlyFans Analytics: Key Metrics Every Creator Should Track",
    targetKeywords: "onlyfans analytics, onlyfans stats, creator metrics",
  },
  {
    topic: "How to Use PPV Messages to 5x Your OnlyFans Revenue",
    targetKeywords: "onlyfans ppv, pay per view, ppv messages tips",
  },
  {
    topic: "Building a Personal Brand on OnlyFans: Stand Out from the Crowd",
    targetKeywords: "onlyfans branding, personal brand, creator brand",
  },
  {
    topic: "Social Media Marketing for OnlyFans: Reddit, Twitter, and Instagram Guide",
    targetKeywords: "onlyfans social media, onlyfans reddit, onlyfans twitter",
  },
  {
    topic: "How Much Do OnlyFans Creators Really Make? Revenue Breakdown",
    targetKeywords: "onlyfans earnings, how much onlyfans pay, onlyfans income",
  },
  {
    topic: "OnlyFans Tips and Tricks: Insider Secrets from Top Creators",
    targetKeywords: "onlyfans tips, onlyfans tricks, onlyfans secrets",
  },
  {
    topic: "Protecting Your Content on OnlyFans: DMCA and Security Guide",
    targetKeywords: "onlyfans dmca, content protection, onlyfans security",
  },
  {
    topic: "How to Retain OnlyFans Subscribers and Reduce Churn",
    targetKeywords: "onlyfans retention, reduce churn, keep subscribers",
  },
  {
    topic: "OnlyFans Tax Guide: What Creators Need to Know",
    targetKeywords: "onlyfans taxes, creator taxes, 1099 onlyfans",
  },
  {
    topic: "Why Low Commission OnlyFans Agencies Outperform Traditional Managers",
    targetKeywords: "onlyfans agency commission, low commission, management fees",
  },
  {
    topic: "Creating a Winning OnlyFans Bio That Converts Visitors to Subscribers",
    targetKeywords: "onlyfans bio, profile optimization, onlyfans profile tips",
  },
  {
    topic: "The Psychology of OnlyFans Subscribers: What Keeps Them Paying",
    targetKeywords: "onlyfans subscribers, fan psychology, subscriber retention",
  },
  {
    topic: "OnlyFans vs Fansly vs Other Platforms: Where Should Creators Be?",
    targetKeywords: "onlyfans alternatives, fansly vs onlyfans, creator platforms",
  },
  {
    topic: "How to Scale Your OnlyFans When You Hit a Revenue Plateau",
    targetKeywords: "scale onlyfans, revenue plateau, grow income onlyfans",
  },
];

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check existing topics to avoid duplicates
  const existing = await prisma.contentPlan.findMany({
    select: { topic: true },
  });
  const existingTopics = new Set(existing.map((e) => e.topic));

  const newTopics = INITIAL_TOPICS.filter((t) => !existingTopics.has(t.topic));

  if (newTopics.length === 0) {
    return NextResponse.json({ message: "All topics already seeded", count: 0 });
  }

  await prisma.contentPlan.createMany({
    data: newTopics.map((t) => ({
      topic: t.topic,
      targetKeywords: t.targetKeywords,
      status: "planned",
    })),
  });

  return NextResponse.json({
    success: true,
    seeded: newTopics.length,
    total: INITIAL_TOPICS.length,
  });
}
