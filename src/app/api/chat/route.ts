import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import prisma from "@/lib/prisma";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, visitorId } = await req.json();

    if (!visitorId || !messages?.length) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Upsert chat session
    let session = await prisma.chatSession.findFirst({
      where: { visitorId, status: "active" },
      orderBy: { createdAt: "desc" },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { visitorId, status: "active" },
      });
    }

    // Store the latest user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "user" && lastMessage.content) {
      await prisma.chatMessage.create({
        data: {
          chatSessionId: session.id,
          role: "user",
          content: lastMessage.content,
        },
      });
    }

    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: CHATBOT_SYSTEM_PROMPT,
      messages,
      onFinish: async ({ text }) => {
        try {
          await prisma.chatMessage.create({
            data: {
              chatSessionId: session.id,
              role: "assistant",
              content: text,
            },
          });
        } catch (e) {
          console.error("Failed to store assistant message:", e);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
