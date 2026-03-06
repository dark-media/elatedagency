import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateReplyEmail } from "@/lib/reply-generator";

export const maxDuration = 60;

const DAILY_AUTO_REPLY_LIMIT = 50;
const MAX_REPLIES_PER_PROSPECT = 7;
const MIN_REPLY_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

const STOP_KEYWORDS = [
  "stop",
  "unsubscribe",
  "remove me",
  "opt out",
  "opt-out",
  "don't contact",
  "dont contact",
  "leave me alone",
  "no thanks",
  "not interested",
];

export async function POST(req: NextRequest) {
  // Validate webhook secret
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.INBOUND_WEBHOOK_SECRET) {
    console.error("Inbound webhook: invalid secret");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse SendGrid Inbound Parse multipart form data
    const formData = await req.formData();

    const fromRaw = formData.get("from") as string | null;
    const toRaw = formData.get("to") as string | null;
    const subject = formData.get("subject") as string | null;
    const textBody = formData.get("text") as string | null;
    const htmlBody = formData.get("html") as string | null;
    const headersRaw = formData.get("headers") as string | null;

    if (!fromRaw || !textBody) {
      console.log("Inbound webhook: missing from or text body");
      return NextResponse.json({ message: "Missing required fields" }, { status: 200 });
    }

    // Extract email from "Name <email@example.com>" format
    const senderEmail = extractEmail(fromRaw);
    if (!senderEmail) {
      console.log("Inbound webhook: could not extract sender email from:", fromRaw);
      return NextResponse.json({ message: "Invalid sender" }, { status: 200 });
    }

    // Extract Message-ID from headers for deduplication
    const messageId = extractHeader(headersRaw, "Message-ID") || extractHeader(headersRaw, "Message-Id");
    const inReplyToHeader = extractHeader(headersRaw, "In-Reply-To");

    // Deduplicate: check if we've already processed this message
    if (messageId) {
      const existing = await prisma.conversationMessage.findFirst({
        where: { messageId },
      });
      if (existing) {
        console.log("Inbound webhook: duplicate message, skipping:", messageId);
        return NextResponse.json({ message: "Already processed" }, { status: 200 });
      }
    }

    // Find the prospect by email (case-insensitive)
    const prospect = await prisma.prospect.findFirst({
      where: {
        email: { equals: senderEmail, mode: "insensitive" },
      },
      include: {
        conversationMessages: {
          orderBy: { createdAt: "asc" },
        },
        outreachMessages: {
          where: { status: "sent" },
          orderBy: { sentAt: "desc" },
        },
      },
    });

    if (!prospect) {
      console.log("Inbound webhook: no matching prospect for:", senderEmail);
      return NextResponse.json({ message: "No matching prospect" }, { status: 200 });
    }

    // Clean the inbound text (strip quoted replies / signatures)
    const cleanedText = stripQuotedText(textBody);

    // Store the inbound message
    await prisma.conversationMessage.create({
      data: {
        prospectId: prospect.id,
        direction: "inbound",
        fromEmail: senderEmail,
        toEmail: toRaw || "natalie@elatedagency.com",
        subject,
        content: cleanedText,
        messageId,
        inReplyTo: inReplyToHeader,
        status: "received",
      },
    });

    // Update OutreachMessage.repliedAt for the latest sent message
    const latestOutreach = prospect.outreachMessages[0];
    if (latestOutreach && !latestOutreach.repliedAt) {
      await prisma.outreachMessage.update({
        where: { id: latestOutreach.id },
        data: { repliedAt: new Date() },
      });
    }

    // === SAFETY RAILS ===

    // 1. Check if prospect opted out of auto-replies
    if (prospect.autoReplyOptedOut) {
      console.log("Inbound webhook: prospect opted out, skipping reply for:", senderEmail);
      return NextResponse.json({ message: "Prospect opted out" }, { status: 200 });
    }

    // 2. Check for stop keywords
    const lowerText = cleanedText.toLowerCase();
    const hasStopKeyword = STOP_KEYWORDS.some((kw) => lowerText.includes(kw));
    if (hasStopKeyword) {
      console.log("Inbound webhook: stop keyword detected from:", senderEmail);

      // Mark as opted out
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: {
          autoReplyOptedOut: true,
          status: "unsubscribed",
        },
      });

      // Send polite goodbye
      const goodbyeHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #eee;">
    <p style="color:#333;font-size:15px;line-height:1.6;">Hey, totally understand! I've removed you from all future messages. If you ever change your mind, you can always reach out to us at <a href="mailto:info@elatedagency.com" style="color:#c5a55a;">info@elatedagency.com</a>.</p>
    <p style="color:#333;font-size:15px;line-height:1.6;">Wishing you all the best! 💛</p>
    <p style="color:#333;font-size:15px;line-height:1.6;">— Natalie</p>
  </div>
</div>
</body></html>`;

      await sendEmail({
        to: senderEmail,
        subject: subject?.startsWith("Re:") ? subject : `Re: ${subject || "Elated Agency"}`,
        html: goodbyeHtml,
        replyTo: "natalie@elatedagency.com",
        inReplyTo: messageId || undefined,
        references: messageId || undefined,
      });

      // Also opt out from email sequences
      await prisma.emailSequenceState.updateMany({
        where: { email: { equals: senderEmail, mode: "insensitive" } },
        data: { optedOut: true },
      });

      return NextResponse.json({ message: "Opt-out processed" }, { status: 200 });
    }

    // 3. Check max auto-replies per prospect
    if (prospect.autoReplyCount >= MAX_REPLIES_PER_PROSPECT) {
      console.log("Inbound webhook: max replies reached for:", senderEmail);
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: { status: "needs_human" },
      });
      return NextResponse.json({ message: "Max replies reached" }, { status: 200 });
    }

    // 4. Rate limit: 1 reply per hour per prospect
    if (prospect.lastAutoReplyAt) {
      const timeSinceLastReply = Date.now() - prospect.lastAutoReplyAt.getTime();
      if (timeSinceLastReply < MIN_REPLY_INTERVAL_MS) {
        console.log("Inbound webhook: rate limited for:", senderEmail);
        return NextResponse.json({ message: "Rate limited" }, { status: 200 });
      }
    }

    // 5. Daily global cap
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const autoRepliesToday = await prisma.conversationMessage.count({
      where: {
        direction: "outbound",
        createdAt: { gte: today },
      },
    });
    if (autoRepliesToday >= DAILY_AUTO_REPLY_LIMIT) {
      console.log("Inbound webhook: daily auto-reply limit reached");
      return NextResponse.json({ message: "Daily limit reached" }, { status: 200 });
    }

    // 6. Check if prospect already has an application
    const existingApp = await prisma.application.findFirst({
      where: { email: { equals: senderEmail, mode: "insensitive" } },
    });

    // === GENERATE AND SEND REPLY ===

    // Build conversation history including outreach messages
    const conversationHistory = [
      // Include original outreach messages as context
      ...prospect.outreachMessages
        .filter((m) => m.sentAt)
        .sort((a, b) => (a.sentAt!.getTime() - b.sentAt!.getTime()))
        .map((m) => ({
          direction: "outbound" as const,
          content: stripHtml(m.content),
          subject: m.subject,
          createdAt: m.sentAt!,
        })),
      // Include conversation messages
      ...prospect.conversationMessages.map((m) => ({
        direction: m.direction,
        content: m.content,
        subject: m.subject,
        createdAt: m.createdAt,
      })),
      // Add the current inbound message
      {
        direction: "inbound" as const,
        content: cleanedText,
        subject,
        createdAt: new Date(),
      },
    ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // If they already applied, adjust the context
    let latestMessage = cleanedText;
    if (existingApp) {
      latestMessage = `[NOTE: This prospect has already submitted an application (status: ${existingApp.status}). Acknowledge this warmly and let them know their application is being processed.]\n\n${cleanedText}`;
    }

    const reply = await generateReplyEmail(
      conversationHistory,
      {
        username: prospect.username,
        platform: prospect.platform,
        email: prospect.email!,
        postContent: prospect.postContent,
      },
      latestMessage
    );

    // Send the reply with threading headers
    const result = await sendEmail({
      to: senderEmail,
      subject: reply.subject,
      html: reply.html,
      replyTo: "natalie@elatedagency.com",
      inReplyTo: messageId || undefined,
      references: messageId || undefined,
    });

    // Store the outbound reply
    await prisma.conversationMessage.create({
      data: {
        prospectId: prospect.id,
        direction: "outbound",
        fromEmail: "natalie@elatedagency.com",
        toEmail: senderEmail,
        subject: reply.subject,
        content: reply.plainText,
        htmlContent: reply.html,
        messageId: result.success && result.messageId ? result.messageId : null,
        inReplyTo: messageId,
        status: result.success ? "sent" : "failed",
      },
    });

    // Update prospect
    await prisma.prospect.update({
      where: { id: prospect.id },
      data: {
        autoReplyCount: { increment: 1 },
        lastAutoReplyAt: new Date(),
        status: prospect.status === "new" || prospect.status === "qualified"
          ? "contacted"
          : prospect.status,
      },
    });

    console.log(`Inbound webhook: auto-replied to ${senderEmail} (reply #${prospect.autoReplyCount + 1})`);

    return NextResponse.json({
      message: "Reply sent",
      prospectId: prospect.id,
      replyCount: prospect.autoReplyCount + 1,
    });
  } catch (error) {
    console.error("Inbound webhook error:", error);
    // Return 200 even on error to prevent SendGrid retries
    return NextResponse.json({ message: "Error processing", error: String(error) }, { status: 200 });
  }
}

// === Helper Functions ===

function extractEmail(fromString: string): string | null {
  // Handle "Name <email@example.com>" format
  const match = fromString.match(/<([^>]+)>/);
  if (match) return match[1].toLowerCase();

  // Handle plain email
  const emailMatch = fromString.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) return emailMatch[0].toLowerCase();

  return null;
}

function extractHeader(headersRaw: string | null, headerName: string): string | null {
  if (!headersRaw) return null;
  const regex = new RegExp(`^${headerName}:\\s*(.+)$`, "mi");
  const match = headersRaw.match(regex);
  return match ? match[1].trim() : null;
}

function stripQuotedText(text: string): string {
  // Remove quoted text from email replies
  const lines = text.split("\n");
  const cleanLines: string[] = [];

  for (const line of lines) {
    // Stop at common reply markers
    if (
      line.startsWith("On ") && line.includes(" wrote:") ||
      line.startsWith(">") ||
      line.startsWith("---") ||
      line.includes("Original Message") ||
      line.includes("Forwarded message") ||
      line.match(/^From:/) ||
      line.match(/^Sent:/) ||
      line.match(/^To:/)
    ) {
      break;
    }
    cleanLines.push(line);
  }

  return cleanLines.join("\n").trim() || text.trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
