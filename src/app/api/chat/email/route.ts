import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { visitorId, email, name } = await req.json();

    if (!visitorId || !email) {
      return NextResponse.json(
        { error: "Missing visitorId or email" },
        { status: 400 }
      );
    }

    // Update chat session with email
    const session = await prisma.chatSession.findFirst({
      where: { visitorId, status: "active" },
      orderBy: { createdAt: "desc" },
    });

    if (session) {
      await prisma.chatSession.update({
        where: { id: session.id },
        data: { visitorEmail: email, visitorName: name || null },
      });
    }

    // Add to email subscribers (ignore if already exists)
    try {
      await prisma.emailSubscriber.create({
        data: { email, name: name || null, source: "chatbot" },
      });
    } catch {
      // Duplicate email — that's fine
    }

    // Start chatbot re-engagement email sequence
    try {
      await prisma.emailSequenceState.create({
        data: {
          email,
          campaignType: "chatbot",
        },
      });
    } catch {
      // Sequence may already exist
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save email" },
      { status: 500 }
    );
  }
}
