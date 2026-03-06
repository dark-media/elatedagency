import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SEQUENCES } from "@/lib/email-sequences";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all active (not completed, not opted out) sequence states
  const activeSequences = await prisma.emailSequenceState.findMany({
    where: { completed: false, optedOut: false },
  });

  let queued = 0;
  let completed = 0;

  for (const seq of activeSequences) {
    const sequence = SEQUENCES[seq.campaignType];
    if (!sequence) continue;

    const nextStep = seq.currentStep;

    // If we've sent all emails in the sequence, mark complete
    if (nextStep >= sequence.length) {
      await prisma.emailSequenceState.update({
        where: { id: seq.id },
        data: { completed: true },
      });
      completed++;
      continue;
    }

    const emailTemplate = sequence[nextStep];

    // Calculate when this email should be sent
    const scheduledFor = new Date(
      seq.startedAt.getTime() +
        sequence
          .slice(0, nextStep + 1)
          .reduce((sum, e) => sum + e.delayHours * 3600000, 0)
    );

    // Only queue if it's time
    if (scheduledFor > new Date()) continue;

    // Check if already queued for this step
    const alreadyQueued = await prisma.emailQueue.findFirst({
      where: {
        to: seq.email,
        campaignType: `${seq.campaignType}_step${nextStep}`,
        status: { in: ["pending", "sent"] },
      },
    });

    if (alreadyQueued) {
      // Already queued/sent, advance to next step
      if (alreadyQueued.status === "sent") {
        await prisma.emailSequenceState.update({
          where: { id: seq.id },
          data: { currentStep: nextStep + 1 },
        });
      }
      continue;
    }

    // Look up subscriber name
    const subscriber = await prisma.emailSubscriber.findUnique({
      where: { email: seq.email },
      select: { name: true },
    });

    // Queue the next email
    await prisma.emailQueue.create({
      data: {
        to: seq.email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html(seq.email, subscriber?.name || undefined),
        scheduledFor,
        campaignType: `${seq.campaignType}_step${nextStep}`,
      },
    });

    // Advance the step
    await prisma.emailSequenceState.update({
      where: { id: seq.id },
      data: { currentStep: nextStep + 1 },
    });

    queued++;
  }

  return NextResponse.json({ queued, completed, processed: activeSequences.length });
}
