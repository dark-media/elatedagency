import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { scoreApplication, getDecision } from "@/lib/application-scoring";
import { sendEmail } from "@/lib/email";

export const maxDuration = 60;

const SITE_URL = "https://elatedagency.com";

function approvalEmail(name: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:20px;font-weight:700;letter-spacing:0.15em;color:#fff;">ELATED</span>
  </div>
  <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
    <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Congratulations, ${name}!</h1>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      Your application to Elated Agency has been <strong style="color:#4ade80;">approved</strong>! We're excited to start working with you.
    </p>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      <strong style="color:#fff;">Next steps:</strong>
    </p>
    <ol style="color:#d9d9de;font-size:15px;line-height:2;padding-left:20px;margin-bottom:24px;">
      <li>Log in to your dashboard to review & sign your contract</li>
      <li>Complete your onboarding profile</li>
      <li>Our AI starts optimizing your account immediately</li>
    </ol>
    <div style="text-align:center;">
      <a href="${SITE_URL}/login" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 40px;border-radius:9999px;text-decoration:none;font-size:16px;">Go to Dashboard</a>
    </div>
  </div>
  <div style="text-align:center;margin-top:32px;color:#747484;font-size:12px;">
    <p>Elated Agency</p>
  </div>
</div></body></html>`;
}

function reviewEmail(name: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:20px;font-weight:700;letter-spacing:0.15em;color:#fff;">ELATED</span>
  </div>
  <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
    <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Application Under Review</h1>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      Hey ${name}, thanks for applying to Elated Agency! Your application is currently being reviewed by our team.
    </p>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      We want to make sure we can provide the best possible service for your specific situation. We may reach out with a few follow-up questions.
    </p>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;">
      You'll hear back from us within 48 hours. In the meantime, check out our <a href="${SITE_URL}/blog" style="color:#c5a55a;">blog</a> for growth tips!
    </p>
  </div>
  <div style="text-align:center;margin-top:32px;color:#747484;font-size:12px;">
    <p>Elated Agency</p>
  </div>
</div></body></html>`;
}

function declineEmail(name: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:20px;font-weight:700;letter-spacing:0.15em;color:#fff;">ELATED</span>
  </div>
  <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
    <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Thanks for Your Interest, ${name}</h1>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      After reviewing your application, we don't think we're the right fit for you at this time. But that doesn't mean you can't crush it on your own!
    </p>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;margin-bottom:16px;">
      <strong style="color:#fff;">Here are some free resources to help you grow:</strong>
    </p>
    <ul style="color:#d9d9de;font-size:15px;line-height:2;padding-left:20px;margin-bottom:24px;">
      <li><a href="${SITE_URL}/academy" style="color:#c5a55a;">Creator Academy</a> — free growth guides</li>
      <li><a href="${SITE_URL}/calculator" style="color:#c5a55a;">Earnings Calculator</a> — set your revenue targets</li>
      <li><a href="${SITE_URL}/blog" style="color:#c5a55a;">Blog</a> — tips from industry experts</li>
    </ul>
    <p style="color:#d9d9de;font-size:16px;line-height:1.7;">
      Once you've built up your presence a bit more, we'd love for you to reapply. We're rooting for you!
    </p>
  </div>
  <div style="text-align:center;margin-top:32px;color:#747484;font-size:12px;">
    <p>Elated Agency</p>
  </div>
</div></body></html>`;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get unprocessed applications
  const applications = await prisma.application.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  let approved = 0;
  let reviewed = 0;
  let declined = 0;

  for (const app of applications) {
    const score = scoreApplication({
      currentEarnings: app.currentEarnings,
      subscriberCount: app.subscriberCount,
      instagram: app.instagram,
      tiktok: app.tiktok,
      twitter: app.twitter,
      onlyfansUrl: app.onlyfansUrl,
      goals: app.goals,
      experience: app.experience,
      contentType: app.contentType,
    });

    const decision = getDecision(score);

    // Update application status
    await prisma.application.update({
      where: { id: app.id },
      data: { status: decision === "approve" ? "approved" : decision === "review" ? "under_review" : "declined" },
    });

    // Send appropriate email
    switch (decision) {
      case "approve":
        await sendEmail({
          to: app.email,
          subject: "Welcome to Elated Agency!",
          html: approvalEmail(app.name),
        });
        approved++;
        break;

      case "review":
        await sendEmail({
          to: app.email,
          subject: "Application Update - Elated Agency",
          html: reviewEmail(app.name),
        });
        reviewed++;
        break;

      case "decline":
        await sendEmail({
          to: app.email,
          subject: "Application Update - Elated Agency",
          html: declineEmail(app.name),
        });
        declined++;
        break;
    }
  }

  return NextResponse.json({
    processed: applications.length,
    approved,
    reviewed,
    declined,
  });
}
