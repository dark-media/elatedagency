import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = (session.user as { id?: string }).id;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    // Get the most recent 30 days of analytics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const analytics = await prisma.analytics.findMany({
      where: {
        userId,
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: "desc" },
    });

    // Get previous 30 days for growth comparison
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const previousAnalytics = await prisma.analytics.findMany({
      where: {
        userId,
        date: {
          gte: sixtyDaysAgo,
          lt: thirtyDaysAgo,
        },
      },
    });

    // Calculate current period totals
    const currentRevenue = analytics.reduce((sum, a) => sum + a.revenue, 0);
    const currentSubscribers = analytics.length > 0
      ? analytics[0].subscribers
      : 0;
    const currentMessages = analytics.reduce((sum, a) => sum + a.messages, 0);
    const currentTips = analytics.reduce((sum, a) => sum + a.tips, 0);
    const currentPpvRevenue = analytics.reduce((sum, a) => sum + a.ppvRevenue, 0);
    const currentNewSubscribers = analytics.reduce(
      (sum, a) => sum + a.newSubscribers,
      0
    );

    // Calculate previous period totals for growth rate
    const previousRevenue = previousAnalytics.reduce(
      (sum, a) => sum + a.revenue,
      0
    );
    const previousSubscribers = previousAnalytics.length > 0
      ? previousAnalytics[0].subscribers
      : 0;

    // Calculate growth rates
    const revenueGrowth =
      previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : 0;

    const subscriberGrowth =
      previousSubscribers > 0
        ? ((currentSubscribers - previousSubscribers) / previousSubscribers) * 100
        : 0;

    // Get recent messages/activity
    const recentMessages = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Get referral stats
    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId },
    });

    const referralEarnings = referrals.reduce(
      (sum, r) => sum + r.earnings,
      0
    );

    return NextResponse.json({
      revenue: {
        total: currentRevenue,
        tips: currentTips,
        ppv: currentPpvRevenue,
        referrals: referralEarnings,
        growth: parseFloat(revenueGrowth.toFixed(1)),
      },
      subscribers: {
        total: currentSubscribers,
        new: currentNewSubscribers,
        growth: parseFloat(subscriberGrowth.toFixed(1)),
      },
      messages: {
        total: currentMessages,
        recent: recentMessages,
      },
      growthRate: parseFloat(revenueGrowth.toFixed(1)),
      recentActivity: recentMessages.map((m) => ({
        id: m.id,
        type: m.type,
        content: m.content,
        sender: m.sender,
        read: m.read,
        createdAt: m.createdAt,
      })),
      analytics: analytics.map((a) => ({
        date: a.date,
        revenue: a.revenue,
        subscribers: a.subscribers,
        newSubscribers: a.newSubscribers,
        messages: a.messages,
        tips: a.tips,
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching dashboard stats" },
      { status: 500 }
    );
  }
}
