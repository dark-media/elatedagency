import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail, applicationReceivedTemplate } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      instagram,
      tiktok,
      twitter,
      onlyfansUrl,
      currentEarnings,
      subscriberCount,
      contentType,
      goals,
      experience,
      referralCode,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Look up existing user by email to link the application
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    const application = await prisma.application.create({
      data: {
        userId: existingUser?.id || null,
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        instagram: instagram || null,
        tiktok: tiktok || null,
        twitter: twitter || null,
        onlyfansUrl: onlyfansUrl || null,
        currentEarnings: currentEarnings || null,
        subscriberCount: subscriberCount || null,
        contentType: contentType || null,
        goals: goals || null,
        experience: experience || null,
        referralCode: referralCode || null,
      },
    });

    // Track referral if a referral code was provided
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: existingUser?.id || null,
            referredEmail: email.toLowerCase(),
            code: referralCode,
            status: "pending",
          },
        });
      }
    }

    // Send confirmation email to the applicant
    await sendEmail({
      to: email,
      subject: "Application Received - Elated Agency",
      html: applicationReceivedTemplate(name),
    });

    // Send notification email to the agency
    await sendEmail({
      to: "info@elatedagency.com",
      subject: `New Application: ${name}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Instagram:</strong> ${instagram || "N/A"}</p>
        <p><strong>TikTok:</strong> ${tiktok || "N/A"}</p>
        <p><strong>Twitter:</strong> ${twitter || "N/A"}</p>
        <p><strong>OnlyFans URL:</strong> ${onlyfansUrl || "N/A"}</p>
        <p><strong>Current Earnings:</strong> ${currentEarnings || "N/A"}</p>
        <p><strong>Subscriber Count:</strong> ${subscriberCount || "N/A"}</p>
        <p><strong>Content Type:</strong> ${contentType || "N/A"}</p>
        <p><strong>Goals:</strong> ${goals || "N/A"}</p>
        <p><strong>Experience:</strong> ${experience || "N/A"}</p>
        <p><strong>Referral Code:</strong> ${referralCode || "None"}</p>
      `,
    });

    return NextResponse.json(
      {
        applicationId: application.id,
        message: "Application submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting your application" },
      { status: 500 }
    );
  }
}
