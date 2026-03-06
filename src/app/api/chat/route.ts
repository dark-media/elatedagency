import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import prisma from "@/lib/prisma";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";

export const maxDuration = 30;

// Extract text content from a message (handles both parts and content formats)
function extractText(msg: Record<string, unknown>): string {
  // v6 parts format (sent by TextStreamChatTransport)
  if (Array.isArray(msg.parts)) {
    return (msg.parts as Array<{ type: string; text?: string }>)
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text)
      .join("");
  }
  // Legacy content format
  if (typeof msg.content === "string") {
    return msg.content;
  }
  return "";
}

export async function POST(req: Request) {
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
  if (lastMessage.role === "user") {
    const text = extractText(lastMessage);
    if (text) {
      await prisma.chatMessage.create({
        data: {
          chatSessionId: session.id,
          role: "user",
          content: text,
        },
      });
    }
  }

  // Convert UI messages (parts format) to model messages (content format)
  const coreMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: CHATBOT_SYSTEM_PROMPT,
    messages: coreMessages,
    onFinish: async ({ text }) => {
      // Store assistant response
      await prisma.chatMessage.create({
        data: {
          chatSessionId: session.id,
          role: "assistant",
          content: text,
        },
      });
    },
  });

  return result.toTextStreamResponse();
}
