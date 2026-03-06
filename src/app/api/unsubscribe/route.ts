import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Mark all sequence states as opted out
  await prisma.emailSequenceState.updateMany({
    where: { email },
    data: { optedOut: true },
  });

  // Cancel any pending emails
  await prisma.emailQueue.updateMany({
    where: { to: email, status: "pending" },
    data: { status: "cancelled" },
  });

  // Redirect to unsubscribe confirmation page
  return NextResponse.redirect(
    new URL(`/unsubscribe?email=${encodeURIComponent(email)}&done=1`, req.url)
  );
}
