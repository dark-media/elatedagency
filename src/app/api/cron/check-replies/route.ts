import { NextRequest, NextResponse } from "next/server";
import { ImapFlow } from "imapflow";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateReplyEmail } from "@/lib/reply-generator";

export const maxDuration = 120;

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

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const imapUser = process.env.GMAIL_IMAP_USER;
  const imapPass = process.env.GMAIL_IMAP_PASS;

  if (!imapUser || !imapPass) {
    return NextResponse.json({ error: "GMAIL_IMAP_USER and GMAIL_IMAP_PASS required" }, { status: 500 });
  }

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: imapUser,
      pass: imapPass,
    },
    logger: false,
  });

  try {
    await client.connect();

    // Open INBOX
    const lock = await client.getMailboxLock("INBOX");

    try {
      // Search for unread emails
      const messages = client.fetch(
        { seen: false },
        {
          uid: true,
          envelope: true,
          source: true,
          flags: true,
        }
      );

      for await (const msg of messages) {
        try {
          const envelope = msg.envelope;
          if (!envelope?.from?.[0]?.address) {
            skipped++;
            continue;
          }

          const senderEmail = envelope.from[0].address.toLowerCase();
          const subject = envelope.subject || "";
          const messageId = envelope.messageId || "";
          const inReplyTo = envelope.inReplyTo || "";

          // Extract plain text from the email source
          const rawSource = msg.source?.toString() || "";
          const textBody = extractPlainText(rawSource);

          if (!textBody.trim()) {
            skipped++;
            // Mark as read even if empty
            await client.messageFlagsAdd(msg.uid, ["\\Seen"], { uid: true });
            continue;
          }

          // Process this email through the auto-reply system
          const result = await processInboundEmail({
            senderEmail,
            subject,
            textBody: stripQuotedText(textBody),
            messageId,
            inReplyTo,
          });

          if (result === "replied") {
            processed++;
          } else {
            skipped++;
          }

          // Mark as read
          await client.messageFlagsAdd(msg.uid, ["\\Seen"], { uid: true });
        } catch (msgError) {
          console.error("Error processing message:", msgError);
          errors++;
          // Still mark as read to avoid reprocessing
          try {
            await client.messageFlagsAdd(msg.uid, ["\\Seen"], { uid: true });
          } catch {}
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
  } catch (error) {
    console.error("IMAP connection error:", error);
    return NextResponse.json(
      { error: "IMAP connection failed", details: String(error) },
      { status: 500 }
    );
  }

  return NextResponse.json({ processed, skipped, errors });
}

async function processInboundEmail({
  senderEmail,
  subject,
  textBody,
  messageId,
  inReplyTo,
}: {
  senderEmail: string;
  subject: string;
  textBody: string;
  messageId: string;
  inReplyTo: string;
}): Promise<"replied" | "skipped"> {
  // Deduplicate by messageId
  if (messageId) {
    const existing = await prisma.conversationMessage.findFirst({
      where: { messageId },
    });
    if (existing) return "skipped";
  }

  // Find prospect by email
  const prospect = await prisma.prospect.findFirst({
    where: {
      email: { equals: senderEmail, mode: "insensitive" },
    },
    include: {
      conversationMessages: { orderBy: { createdAt: "asc" } },
      outreachMessages: {
        where: { status: "sent" },
        orderBy: { sentAt: "desc" },
      },
    },
  });

  if (!prospect) {
    console.log(`Check-replies: no prospect found for ${senderEmail}`);
    return "skipped";
  }

  // Store the inbound message
  await prisma.conversationMessage.create({
    data: {
      prospectId: prospect.id,
      direction: "inbound",
      fromEmail: senderEmail,
      toEmail: "natalie@elatedagency.com",
      subject,
      content: textBody,
      messageId: messageId || null,
      inReplyTo: inReplyTo || null,
      status: "received",
    },
  });

  // Update OutreachMessage.repliedAt
  const latestOutreach = prospect.outreachMessages[0];
  if (latestOutreach && !latestOutreach.repliedAt) {
    await prisma.outreachMessage.update({
      where: { id: latestOutreach.id },
      data: { repliedAt: new Date() },
    });
  }

  // === SAFETY RAILS ===

  // 1. Opted out?
  if (prospect.autoReplyOptedOut) {
    console.log(`Check-replies: prospect opted out: ${senderEmail}`);
    return "skipped";
  }

  // 2. Stop keywords?
  const lowerText = textBody.toLowerCase();
  const hasStopKeyword = STOP_KEYWORDS.some((kw) => lowerText.includes(kw));
  if (hasStopKeyword) {
    console.log(`Check-replies: stop keyword from ${senderEmail}`);

    await prisma.prospect.update({
      where: { id: prospect.id },
      data: { autoReplyOptedOut: true, status: "unsubscribed" },
    });

    // Send polite goodbye
    const goodbyeHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #eee;">
    <p style="color:#333;font-size:15px;line-height:1.6;">Hey, totally understand! I've removed you from all future messages. If you ever change your mind, you can always reach out at <a href="mailto:info@elatedagency.com" style="color:#c5a55a;">info@elatedagency.com</a>.</p>
    <p style="color:#333;font-size:15px;line-height:1.6;">Wishing you all the best! 💛</p>
    <p style="color:#333;font-size:15px;line-height:1.6;">— Natalie</p>
  </div>
</div>
</body></html>`;

    await sendEmail({
      to: senderEmail,
      subject: subject.startsWith("Re:") ? subject : `Re: ${subject || "Elated Agency"}`,
      html: goodbyeHtml,
      replyTo: "natalie@elatedagency.com",
      inReplyTo: messageId || undefined,
      references: messageId || undefined,
    });

    await prisma.emailSequenceState.updateMany({
      where: { email: { equals: senderEmail, mode: "insensitive" } },
      data: { optedOut: true },
    });

    return "replied";
  }

  // 3. Max replies per prospect
  if (prospect.autoReplyCount >= MAX_REPLIES_PER_PROSPECT) {
    console.log(`Check-replies: max replies for ${senderEmail}`);
    await prisma.prospect.update({
      where: { id: prospect.id },
      data: { status: "needs_human" },
    });
    return "skipped";
  }

  // 4. Rate limit per prospect (1 reply per hour)
  if (prospect.lastAutoReplyAt) {
    const elapsed = Date.now() - prospect.lastAutoReplyAt.getTime();
    if (elapsed < MIN_REPLY_INTERVAL_MS) {
      console.log(`Check-replies: rate limited for ${senderEmail}`);
      return "skipped";
    }
  }

  // 5. Daily global cap
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const autoRepliesToday = await prisma.conversationMessage.count({
    where: { direction: "outbound", createdAt: { gte: today } },
  });
  if (autoRepliesToday >= DAILY_AUTO_REPLY_LIMIT) {
    console.log("Check-replies: daily limit reached");
    return "skipped";
  }

  // 6. Check if already applied
  const existingApp = await prisma.application.findFirst({
    where: { email: { equals: senderEmail, mode: "insensitive" } },
  });

  // === GENERATE REPLY ===

  const conversationHistory = [
    ...prospect.outreachMessages
      .filter((m) => m.sentAt)
      .sort((a, b) => a.sentAt!.getTime() - b.sentAt!.getTime())
      .map((m) => ({
        direction: "outbound" as const,
        content: stripHtml(m.content),
        subject: m.subject,
        createdAt: m.sentAt!,
      })),
    ...prospect.conversationMessages.map((m) => ({
      direction: m.direction,
      content: m.content,
      subject: m.subject,
      createdAt: m.createdAt,
    })),
    {
      direction: "inbound" as const,
      content: textBody,
      subject,
      createdAt: new Date(),
    },
  ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  let latestMessage = textBody;
  if (existingApp) {
    latestMessage = `[NOTE: This prospect has already submitted an application (status: ${existingApp.status}). Acknowledge this warmly.]\n\n${textBody}`;
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

  // Send reply
  const result = await sendEmail({
    to: senderEmail,
    subject: reply.subject,
    html: reply.html,
    replyTo: "natalie@elatedagency.com",
    inReplyTo: messageId || undefined,
    references: messageId || undefined,
  });

  // Store outbound reply
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
      inReplyTo: messageId || null,
      status: result.success ? "sent" : "failed",
    },
  });

  // Update prospect
  await prisma.prospect.update({
    where: { id: prospect.id },
    data: {
      autoReplyCount: { increment: 1 },
      lastAutoReplyAt: new Date(),
      status:
        prospect.status === "new" || prospect.status === "qualified"
          ? "contacted"
          : prospect.status,
    },
  });

  console.log(`Check-replies: auto-replied to ${senderEmail} (#${prospect.autoReplyCount + 1})`);
  return "replied";
}

// === Helpers ===

function extractPlainText(rawEmail: string): string {
  // Try to find the text/plain part
  const parts = rawEmail.split(/\r?\n\r?\n/);
  if (parts.length < 2) return rawEmail;

  // Simple approach: get the body after headers
  const body = parts.slice(1).join("\n\n");

  // If it looks like HTML, strip it
  if (body.includes("<html") || body.includes("<div") || body.includes("<p>")) {
    return stripHtml(body);
  }

  // Handle base64 encoded content
  if (rawEmail.includes("Content-Transfer-Encoding: base64")) {
    const base64Match = body.match(/([A-Za-z0-9+/=\r\n]+)/);
    if (base64Match) {
      try {
        const decoded = Buffer.from(base64Match[1].replace(/\r?\n/g, ""), "base64").toString("utf-8");
        return decoded.includes("<") ? stripHtml(decoded) : decoded;
      } catch {}
    }
  }

  // Handle quoted-printable
  if (rawEmail.includes("Content-Transfer-Encoding: quoted-printable")) {
    return body
      .replace(/=\r?\n/g, "")
      .replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  return body;
}

function stripQuotedText(text: string): string {
  const lines = text.split("\n");
  const cleanLines: string[] = [];

  for (const line of lines) {
    if (
      (line.startsWith("On ") && line.includes(" wrote:")) ||
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
