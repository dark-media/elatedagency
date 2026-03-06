import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Find the referrer by their referral code
    const referrer = await prisma.user.findUnique({
      where: { referralCode: code },
    });

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      );
    }

    // Find existing referral record for this code, or create one to track clicks
    const existingReferral = await prisma.referral.findFirst({
      where: {
        referrerId: referrer.id,
        code,
        referredId: null,
      },
    });

    if (existingReferral) {
      // Increment click count on existing referral
      await prisma.referral.update({
        where: { id: existingReferral.id },
        data: { clickCount: existingReferral.clickCount + 1 },
      });
    } else {
      // Create a new referral tracking record
      await prisma.referral.create({
        data: {
          referrerId: referrer.id,
          code,
          clickCount: 1,
          status: "pending",
        },
      });
    }

    return NextResponse.json({
      message: "Referral click tracked",
    });
  } catch (error) {
    console.error("Referral tracking error:", error);
    return NextResponse.json(
      { error: "An error occurred while tracking the referral" },
      { status: 500 }
    );
  }
}

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

    // Get the user's referral code
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { referralCode: true, name: true },
    });

    if (!user?.referralCode) {
      return NextResponse.json(
        { error: "No referral code found for this user" },
        { status: 404 }
      );
    }

    // Get all referrals for this user
    const referrals = await prisma.referral.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: "desc" },
    });

    const totalClicks = referrals.reduce((sum, r) => sum + r.clickCount, 0);
    const totalSignups = referrals.filter((r) => r.referredId !== null).length;
    const totalEarnings = referrals.reduce((sum, r) => sum + r.earnings, 0);
    const pendingReferrals = referrals.filter(
      (r) => r.status === "pending"
    ).length;
    const activeReferrals = referrals.filter(
      (r) => r.status === "active"
    ).length;

    return NextResponse.json({
      referralCode: user.referralCode,
      referralLink: `${process.env.NEXTAUTH_URL || "https://elatedagency.com"}/apply?ref=${user.referralCode}`,
      stats: {
        totalClicks,
        totalSignups,
        totalEarnings,
        pendingReferrals,
        activeReferrals,
        conversionRate:
          totalClicks > 0
            ? parseFloat(((totalSignups / totalClicks) * 100).toFixed(1))
            : 0,
      },
      referrals: referrals.map((r) => ({
        id: r.id,
        referredEmail: r.referredEmail,
        status: r.status,
        earnings: r.earnings,
        clickCount: r.clickCount,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Referral stats error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching referral stats" },
      { status: 500 }
    );
  }
}
