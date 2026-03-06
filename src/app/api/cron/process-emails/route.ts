import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const maxDuration = 60;

const DAILY_LIMIT = 500;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check daily send count
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sentToday = await prisma.emailQueue.count({
    where: { sentAt: { gte: today }, status: "sent" },
  });

  if (sentToday >= DAILY_LIMIT) {
    return NextResponse.json({ message: "Daily send limit reached", sentToday });
  }

  const remaining = DAILY_LIMIT - sentToday;

  // Get pending emails that are scheduled for now or earlier
  const pendingEmails = await prisma.emailQueue.findMany({
    where: {
      status: "pending",
      scheduledFor: { lte: new Date() },
    },
    orderBy: { scheduledFor: "asc" },
    take: Math.min(remaining, 50), // Process up to 50 per run
  });

  let sent = 0;
  let failed = 0;

  for (const email of pendingEmails) {
    // Check if recipient has opted out
    const seqState = await prisma.emailSequenceState.findFirst({
      where: { email: email.to, optedOut: true },
    });

    if (seqState) {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: { status: "cancelled", error: "Recipient opted out" },
      });
      continue;
    }

    const result = await sendEmail({
      to: email.to,
      subject: email.subject,
      html: email.htmlContent,
    });

    if (result.success) {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: { status: "sent", sentAt: new Date() },
      });
      sent++;
    } else {
      await prisma.emailQueue.update({
        where: { id: email.id },
        data: { status: "failed", error: String(result.error) },
      });
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, remaining: remaining - sent });
}
