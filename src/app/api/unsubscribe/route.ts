import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const decodedEmail = decodeURIComponent(email);

  // Mark all sequence states as opted out
  await prisma.emailSequenceState.updateMany({
    where: { email: { equals: decodedEmail, mode: "insensitive" } },
    data: { optedOut: true },
  });

  // Cancel any pending emails
  await prisma.emailQueue.updateMany({
    where: { to: { equals: decodedEmail, mode: "insensitive" }, status: "pending" },
    data: { status: "cancelled" },
  });

  // Also opt out of auto-replies for any matching prospects
  await prisma.prospect.updateMany({
    where: { email: { equals: decodedEmail, mode: "insensitive" } },
    data: {
      autoReplyOptedOut: true,
      status: "unsubscribed",
    },
  });

  // Redirect to unsubscribe confirmation page
  return NextResponse.redirect(
    new URL(`/unsubscribe?email=${encodeURIComponent(email)}&done=1`, req.url)
  );
}
