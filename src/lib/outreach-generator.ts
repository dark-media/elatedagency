// Generates personalized outreach emails using AI

import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

interface ProspectInfo {
  username: string;
  postContent: string;
  platform: string;
  step: number;
}

const SITE_URL = "https://elatedagency.com";

export async function generateOutreachEmail(
  prospect: ProspectInfo
): Promise<{ subject: string; html: string }> {
  const stepPrompts: Record<number, string> = {
    0: `Write the INITIAL outreach email. Reference their specific Reddit post naturally. Be friendly and helpful, not salesy. Mention one specific tip relevant to their situation, then introduce Elated Agency as a resource. Keep it short (3-4 paragraphs max).`,
    1: `Write a FOLLOW-UP email (3 days after initial). Acknowledge you reached out before. Share a quick actionable tip for OnlyFans growth. Mention Elated's 20% commission rate and no-contract policy as a casual P.S.`,
    2: `Write a FINAL follow-up (7 days after initial). Keep it very brief (2 paragraphs). Wish them well, mention you're available if they ever want help, and include one last mention of Elated Agency.`,
  };

  const prompt = stepPrompts[prospect.step] || stepPrompts[0];

  const { text } = await generateText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: `You are writing outreach emails for Elated Agency, an AI-powered OnlyFans management agency.

Key facts:
- 20% commission (industry lowest)
- No contracts, month-to-month
- AI-powered chat management, revenue optimization
- Creators average 3-10x growth in 90 days
- Apply at ${SITE_URL}/apply

Rules:
- Be genuine, helpful, and not pushy
- Reference their actual post/situation specifically
- Provide real value (a tip or insight)
- CAN-SPAM compliant: include unsubscribe link
- Keep emails short and scannable
- Do NOT use fake urgency or manipulative tactics
- Write like a real person, not a marketer

Output format:
SUBJECT: [subject line here]
---
[email body in HTML - use <p>, <strong>, <a> tags only, no complex HTML]`,
    prompt: `Prospect: u/${prospect.username} on Reddit
Their post: "${prospect.postContent.slice(0, 500)}"

${prompt}`,
  });

  // Parse subject and body
  const subjectMatch = text.match(/SUBJECT:\s*(.+)/);
  const subject = subjectMatch?.[1]?.trim() || `Quick tip for your OnlyFans, u/${prospect.username}`;

  const bodyStart = text.indexOf("---");
  let body = bodyStart >= 0 ? text.slice(bodyStart + 3).trim() : text;

  // Wrap in email template
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #eee;">
    ${body}
  </div>
  <div style="text-align:center;margin-top:24px;color:#999;font-size:12px;">
    <p>Elated Agency | <a href="${SITE_URL}" style="color:#c5a55a;">elatedagency.com</a></p>
    <p style="margin-top:8px;">
      <a href="${SITE_URL}/api/unsubscribe?email=PROSPECT_EMAIL" style="color:#999;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>
</div>
</body>
</html>`;

  return { subject, html };
}
