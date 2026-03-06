import { NextRequest, NextResponse } from "next/server";
import * as tls from "tls";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateReplyEmail } from "@/lib/reply-generator";

export const maxDuration = 60;

const DAILY_AUTO_REPLY_LIMIT = 50;
const MAX_REPLIES_PER_PROSPECT = 7;
const MIN_REPLY_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const MAX_MESSAGES_PER_RUN = 5;

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

// Minimal IMAP client using raw TLS
class SimpleIMAP {
  private socket: tls.TLSSocket | null = null;
  private buffer = "";
  private tagCounter = 0;
  private onData: ((data: string) => void) | null = null;

  async connect(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Connection timeout")), 15000);

      this.socket = tls.connect({ host, port, servername: host }, () => {
        clearTimeout(timeout);
      });

      this.socket.setEncoding("utf8");
      this.socket.on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });

      // Wait for server greeting
      let greeting = "";
      const onGreeting = (data: string) => {
        greeting += data;
        if (greeting.includes("\r\n")) {
          this.socket!.removeListener("data", onGreeting);
          // Set up regular data handler
          this.socket!.on("data", (chunk: string) => {
            this.buffer += chunk;
            if (this.onData) this.onData(chunk);
          });
          resolve();
        }
      };
      this.socket!.on("data", onGreeting);
    });
  }

  private async command(cmd: string): Promise<string> {
    const tag = `A${++this.tagCounter}`;
    const fullCmd = `${tag} ${cmd}\r\n`;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Command timeout: ${cmd.split(" ")[0]}`)), 20000);
      let response = "";

      this.onData = () => {
        // Check if we have a complete tagged response
        const lines = this.buffer.split("\r\n");
        for (const line of lines) {
          if (line.startsWith(`${tag} `)) {
            clearTimeout(timeout);
            this.onData = null;
            response = this.buffer;
            this.buffer = "";
            resolve(response);
            return;
          }
        }
      };

      // Check buffer for any data already received
      this.buffer = "";
      this.socket!.write(fullCmd);
    });
  }

  async login(user: string, pass: string): Promise<void> {
    const resp = await this.command(`LOGIN "${user}" "${pass}"`);
    if (!resp.includes("OK")) throw new Error("Login failed");
  }

  async select(mailbox: string): Promise<void> {
    const resp = await this.command(`SELECT "${mailbox}"`);
    if (!resp.includes("OK")) throw new Error(`Select ${mailbox} failed`);
  }

  async searchUnseen(): Promise<number[]> {
    const resp = await this.command("SEARCH UNSEEN");
    const match = resp.match(/\* SEARCH([\d\s]*)/);
    if (!match || !match[1].trim()) return [];
    return match[1].trim().split(/\s+/).map(Number);
  }

  async fetchMessage(seqNum: number): Promise<{
    headers: string;
    body: string;
    raw: string;
  }> {
    const resp = await this.command(`FETCH ${seqNum} (BODY[HEADER] BODY[TEXT])`);

    // Parse headers
    const headerMatch = resp.match(/BODY\[HEADER\]\s*\{(\d+)\}\r\n([\s\S]*?)(?=\r\n\* |BODY\[TEXT\])/);
    const headers = headerMatch ? headerMatch[2] : "";

    // Parse body text
    const bodyMatch = resp.match(/BODY\[TEXT\]\s*\{(\d+)\}\r\n([\s\S]*?)(?=\)\r\n)/);
    const body = bodyMatch ? bodyMatch[2] : "";

    return { headers, body, raw: resp };
  }

  async markAsRead(seqNum: number): Promise<void> {
    await this.command(`STORE ${seqNum} +FLAGS (\\Seen)`);
  }

  async logout(): Promise<void> {
    try {
      await this.command("LOGOUT");
    } catch {}
    this.socket?.destroy();
  }
}

function parseHeader(headers: string, name: string): string {
  const regex = new RegExp(`^${name}:\\s*(.+?)(?=\\r?\\n(?!\\s)|$)`, "mi");
  const match = headers.match(regex);
  return match ? match[1].trim() : "";
}

function parseEmailAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  if (match) return match[1].toLowerCase();
  const emailMatch = from.match(/[\w.-]+@[\w.-]+\.\w+/);
  return emailMatch ? emailMatch[0].toLowerCase() : from.toLowerCase();
}

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

  const imap = new SimpleIMAP();

  try {
    console.log("Check-replies: connecting to IMAP...");
    await imap.connect("imap.gmail.com", 993);
    console.log("Check-replies: connected, logging in...");
    await imap.login(imapUser, imapPass);
    console.log("Check-replies: logged in, selecting INBOX...");
    await imap.select("INBOX");

    const unseenIds = await imap.searchUnseen();
    console.log(`Check-replies: found ${unseenIds.length} unread messages`);

    const toProcess = unseenIds.slice(0, MAX_MESSAGES_PER_RUN);

    for (const seqNum of toProcess) {
      try {
        const msg = await imap.fetchMessage(seqNum);

        const from = parseHeader(msg.headers, "From");
        const subject = parseHeader(msg.headers, "Subject");
        const messageId = parseHeader(msg.headers, "Message-ID") || parseHeader(msg.headers, "Message-Id");
        const inReplyTo = parseHeader(msg.headers, "In-Reply-To");

        if (!from) {
          skipped++;
          await imap.markAsRead(seqNum);
          continue;
        }

        const senderEmail = parseEmailAddress(from);
        const textBody = extractPlainText(msg.body, msg.headers);

        if (!textBody.trim()) {
          skipped++;
          await imap.markAsRead(seqNum);
          continue;
        }

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

        await imap.markAsRead(seqNum);
      } catch (msgError) {
        console.error("Error processing message:", msgError);
        errors++;
        try { await imap.markAsRead(seqNum); } catch {}
      }
    }

    await imap.logout();
  } catch (error) {
    console.error("IMAP error:", error);
    try { await imap.logout(); } catch {}
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

function extractPlainText(body: string, headers: string): string {
  // Check content transfer encoding
  const isBase64 = headers.toLowerCase().includes("content-transfer-encoding: base64") ||
                   body.includes("Content-Transfer-Encoding: base64");
  const isQP = headers.toLowerCase().includes("content-transfer-encoding: quoted-printable") ||
               body.includes("Content-Transfer-Encoding: quoted-printable");

  let text = body;

  // Handle base64
  if (isBase64) {
    try {
      const cleaned = text.replace(/\r?\n/g, "").replace(/[^A-Za-z0-9+/=]/g, "");
      text = Buffer.from(cleaned, "base64").toString("utf-8");
    } catch {}
  }

  // Handle quoted-printable
  if (isQP) {
    text = text
      .replace(/=\r?\n/g, "")
      .replace(/=([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  // If HTML, strip tags
  if (text.includes("<html") || text.includes("<div") || text.includes("<p>")) {
    text = stripHtml(text);
  }

  return text.trim();
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
