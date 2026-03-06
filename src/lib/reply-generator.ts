// Generates AI-powered reply emails for inbound prospect messages

import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

interface ConversationEntry {
  direction: string;
  content: string;
  subject?: string | null;
  createdAt: Date;
}

interface ProspectContext {
  username: string;
  platform: string;
  email: string;
  postContent?: string | null;
}

const SITE_URL = "https://elatedagency.com";

export async function generateReplyEmail(
  conversationHistory: ConversationEntry[],
  prospect: ProspectContext,
  latestMessage: string
): Promise<{ subject: string; html: string; plainText: string }> {
  // Build conversation thread for context
  const threadSummary = conversationHistory
    .map((msg) => {
      const label = msg.direction === "inbound" ? `${prospect.username}` : "Natalie (Elated)";
      return `[${label}]: ${msg.content.slice(0, 500)}`;
    })
    .join("\n\n");

  const { text } = await generateText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: `You are Natalie from Elated Agency, replying to an email from a prospect who responded to your outreach.

Key facts about Elated Agency:
- The world's first fully AI-powered OnlyFans management agency
- Only 20% commission (industry lowest) — after OnlyFans takes their 20%
- No lock-in contracts — month-to-month, cancel anytime with 7 days notice
- No upfront fees or setup costs
- AI-powered chat management handles subscriber messages 24/7
- Creators average 3-10x growth in 90 days
- 500+ active creators managed
- Apply at ${SITE_URL}/apply

Rules:
- Be conversational and genuine — this is a real email reply, not a template
- Answer their questions directly and honestly
- Reference the conversation history naturally so it feels like a real back-and-forth
- Always guide toward applying at ${SITE_URL}/apply but don't be pushy
- If they ask about pricing, explain the 20% commission structure clearly
- If they express strong interest, provide the direct apply link
- If they want to opt out or seem uninterested, acknowledge gracefully and wish them well
- Sign as "Natalie" or "Natalie from Elated"
- Keep replies short and natural (2-3 paragraphs max)
- NEVER use the name "Gary" anywhere
- NEVER say you are an AI or automated system — you are Natalie
- Don't use marketing speak, be human and warm
- If they ask something you can't answer specifically, suggest they reach out at info@elatedagency.com or apply for a personalized consultation

Output format:
BODY:
[email body as plain text - use short paragraphs, no HTML]`,
    prompt: `Prospect: ${prospect.username} (found on ${prospect.platform})
Their email: ${prospect.email}
${prospect.postContent ? `Their original post/bio: "${prospect.postContent.slice(0, 300)}"` : ""}

Conversation so far:
${threadSummary}

Their latest message:
"${latestMessage}"

Write a natural reply to their latest message.`,
  });

  // Extract body
  const bodyStart = text.indexOf("BODY:");
  const plainText = bodyStart >= 0 ? text.slice(bodyStart + 5).trim() : text.trim();

  // Convert plain text to HTML
  const htmlBody = plainText
    .split("\n\n")
    .map((paragraph) => `<p style="color:#333;font-size:15px;line-height:1.6;margin-bottom:16px;">${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("\n");

  // Get subject from the latest outreach message or conversation
  const originalSubject = conversationHistory.find(
    (msg) => msg.direction === "outbound" && msg.subject
  )?.subject;
  const subject = originalSubject
    ? originalSubject.startsWith("Re: ")
      ? originalSubject
      : `Re: ${originalSubject}`
    : "Re: Elated Agency";

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #eee;">
    ${htmlBody}
  </div>
  <div style="text-align:center;margin-top:24px;color:#999;font-size:12px;">
    <p>Elated Agency | <a href="${SITE_URL}" style="color:#c5a55a;">elatedagency.com</a></p>
    <p style="margin-top:8px;">
      <a href="${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(prospect.email)}" style="color:#999;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>
</div>
</body>
</html>`;

  return { subject, html, plainText };
}
