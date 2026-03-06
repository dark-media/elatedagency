import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function verifyAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    blogPosts,
    contentPlans,
    prospects,
    outreachMessages,
    discoveryLogs,
    emailQueue,
    emailSequences,
    chatSessions,
    applications,
  ] = await Promise.all([
    // Recent blog posts
    prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        publishedAt: true,
        category: true,
        createdAt: true,
      },
    }),
    // Content plan status
    prisma.contentPlan.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        topic: true,
        status: true,
        createdAt: true,
      },
    }),
    // Prospects
    prisma.prospect.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        platform: true,
        username: true,
        displayName: true,
        score: true,
        status: true,
        email: true,
        outreachStep: true,
        lastContactedAt: true,
        discoveredFrom: true,
        createdAt: true,
      },
    }),
    // Outreach messages
    prisma.outreachMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        channel: true,
        subject: true,
        step: true,
        status: true,
        sentAt: true,
        openedAt: true,
        repliedAt: true,
        createdAt: true,
        prospect: {
          select: { username: true, platform: true },
        },
      },
    }),
    // Discovery logs
    prisma.discoveryLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        platform: true,
        query: true,
        resultsFound: true,
        prospectsCreated: true,
        createdAt: true,
      },
    }),
    // Email queue
    prisma.emailQueue.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        to: true,
        subject: true,
        status: true,
        campaignType: true,
        scheduledFor: true,
        sentAt: true,
        error: true,
        createdAt: true,
      },
    }),
    // Email sequence states
    prisma.emailSequenceState.findMany({
      orderBy: { updatedAt: "desc" },
      take: 20,
      select: {
        id: true,
        email: true,
        campaignType: true,
        currentStep: true,
        completed: true,
        optedOut: true,
        startedAt: true,
        updatedAt: true,
      },
    }),
    // Chat sessions
    prisma.chatSession.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        visitorId: true,
        visitorEmail: true,
        status: true,
        createdAt: true,
        _count: { select: { messages: true } },
      },
    }),
    // Applications
    prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        currentEarnings: true,
        createdAt: true,
      },
    }),
  ]);

  // Aggregate counts
  const [
    totalPosts,
    totalProspects,
    totalOutreach,
    totalEmailsSent,
    totalChats,
    totalApps,
    pendingTopics,
    highScoreProspects,
  ] = await Promise.all([
    prisma.blogPost.count({ where: { published: true } }),
    prisma.prospect.count(),
    prisma.outreachMessage.count(),
    prisma.emailQueue.count({ where: { status: "sent" } }),
    prisma.chatSession.count(),
    prisma.application.count(),
    prisma.contentPlan.count({ where: { status: "planned" } }),
    prisma.prospect.count({ where: { score: { gte: 60 } } }),
  ]);

  return NextResponse.json({
    summary: {
      totalBlogPosts: totalPosts,
      pendingTopics,
      totalProspects,
      highScoreProspects,
      totalOutreachSent: totalOutreach,
      totalEmailsSent,
      totalChatSessions: totalChats,
      totalApplications: totalApps,
    },
    blogPosts,
    contentPlans,
    prospects,
    outreachMessages,
    discoveryLogs,
    emailQueue,
    emailSequences,
    chatSessions,
    applications,
  });
}
