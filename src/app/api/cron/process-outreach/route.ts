import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateOutreachEmail } from "@/lib/outreach-generator";

export const maxDuration = 60;

const DAILY_OUTREACH_LIMIT = 20;

// Delay between outreach steps in hours
const STEP_DELAYS = [0, 72, 168]; // immediate, 3 days, 7 days

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check daily outreach count
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sentToday = await prisma.outreachMessage.count({
    where: { sentAt: { gte: today } },
  });

  if (sentToday >= DAILY_OUTREACH_LIMIT) {
    return NextResponse.json({ message: "Daily outreach limit reached", sentToday });
  }

  const remaining = DAILY_OUTREACH_LIMIT - sentToday;

  // Get qualified prospects ready for outreach
  const prospects = await prisma.prospect.findMany({
    where: {
      score: { gte: 60 },
      status: { in: ["qualified", "contacted"] },
      email: { not: null },
      outreachStep: { lt: 3 },
    },
    orderBy: { score: "desc" },
    take: remaining,
    include: { outreachMessages: true },
  });

  let sent = 0;
  let skipped = 0;

  for (const prospect of prospects) {
    // Check if enough time has passed since last contact
    if (prospect.lastContactedAt) {
      const hoursSinceContact =
        (Date.now() - prospect.lastContactedAt.getTime()) / 3600000;
      const requiredDelay = STEP_DELAYS[prospect.outreachStep] || 168;
      if (hoursSinceContact < requiredDelay) {
        skipped++;
        continue;
      }
    }

    if (!prospect.email) {
      skipped++;
      continue;
    }

    try {
      // Generate personalized outreach email
      const { subject, html } = await generateOutreachEmail({
        username: prospect.username,
        postContent: prospect.postContent || "",
        platform: prospect.platform,
        step: prospect.outreachStep,
      });

      // Replace placeholder with actual email for unsubscribe
      const finalHtml = html.replace("PROSPECT_EMAIL", encodeURIComponent(prospect.email));

      // Send the email
      const result = await sendEmail({
        to: prospect.email,
        subject,
        html: finalHtml,
      });

      // Record the outreach message
      await prisma.outreachMessage.create({
        data: {
          prospectId: prospect.id,
          channel: "email",
          subject,
          content: finalHtml,
          step: prospect.outreachStep,
          status: result.success ? "sent" : "failed",
          sentAt: result.success ? new Date() : null,
        },
      });

      // Update prospect
      if (result.success) {
        await prisma.prospect.update({
          where: { id: prospect.id },
          data: {
            outreachStep: prospect.outreachStep + 1,
            lastContactedAt: new Date(),
            status: prospect.outreachStep >= 2 ? "completed" : "contacted",
          },
        });
        sent++;
      }
    } catch (error) {
      console.error(`Outreach error for ${prospect.username}:`, error);
    }
  }

  return NextResponse.json({ sent, skipped, remaining: remaining - sent });
}
