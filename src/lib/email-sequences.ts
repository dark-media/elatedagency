// Email sequence templates for automated drip campaigns

const SITE_URL = "https://elatedagency.com";

function unsubLink(email: string): string {
  return `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
}

function emailWrapper(content: string, email: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:20px;font-weight:700;letter-spacing:0.15em;color:#fff;">ELATED</span>
  </div>
  <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
    ${content}
  </div>
  <div style="text-align:center;margin-top:32px;color:#747484;font-size:12px;">
    <p>Elated Agency &mdash; Premium OnlyFans Management</p>
    <p style="margin-top:8px;">
      <a href="${SITE_URL}" style="color:#c5a55a;text-decoration:none;">elatedagency.com</a>
    </p>
    <p style="margin-top:12px;">
      <a href="${unsubLink(email)}" style="color:#747484;text-decoration:underline;">Unsubscribe</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

export interface SequenceEmail {
  subject: string;
  html: (email: string, name?: string) => string;
  delayHours: number; // hours after previous email (or sequence start for step 0)
}

// === WELCOME SEQUENCE (newsletter signup) ===
// 5 emails over 14 days

export const WELCOME_SEQUENCE: SequenceEmail[] = [
  {
    subject: "Your Free OnlyFans Growth Checklist",
    delayHours: 24,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Hey${name ? ` ${name}` : ""}! Let's grow your OnlyFans</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Thanks for joining the Elated community. Here's a quick growth checklist that our top creators swear by:
    </p>
    <ol style="color:#d9d9de;font-size:15px;line-height:2;padding-left:20px;margin-bottom:24px;">
      <li>Optimize your bio with a clear value proposition</li>
      <li>Post consistently (3-5 times per week minimum)</li>
      <li>Use PPV messages strategically (not too often)</li>
      <li>Engage with subscribers within 1 hour of messaging</li>
      <li>Cross-promote on Reddit, Twitter & Instagram</li>
    </ol>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      Want us to handle all of this for you? Our AI-powered management takes care of everything at just <strong style="color:#fff;">20% commission</strong>.
    </p>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">See What We Can Do</a>
    </div>`,
        email
      ),
  },
  {
    subject: "How creators go from $2K to $15K/mo (real data)",
    delayHours: 72,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">The numbers don't lie${name ? `, ${name}` : ""}</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      We analyzed data from 500+ creators to find out what separates the top earners from the rest. Here's what we found:
    </p>
    <div style="background:#1a1a1f;border-radius:12px;padding:24px;margin-bottom:20px;">
      <p style="color:#c5a55a;font-size:14px;font-weight:600;margin-bottom:8px;">AVERAGE RESULTS (FIRST 90 DAYS)</p>
      <p style="color:#fff;font-size:28px;font-weight:700;margin-bottom:4px;">$2,000 → $15,000/mo</p>
      <p style="color:#91919f;font-size:14px;">That's a 7.5x increase in revenue</p>
    </div>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      The top 3 factors? <strong style="color:#fff;">Response time</strong> (AI handles this 24/7), <strong style="color:#fff;">pricing optimization</strong> (dynamic, data-driven), and <strong style="color:#fff;">consistent content</strong> (we plan it for you).
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      No contracts. No risk. Just results.
    </p>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Apply in 2 Minutes</a>
    </div>`,
        email
      ),
  },
  {
    subject: "The #1 mistake OnlyFans creators make",
    delayHours: 96,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">${name ? `${name}, t` : "T"}he biggest mistake? Doing everything yourself</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Most creators spend 4-6 hours a day on chat management alone. That's time you could spend creating content, living your life, or building your brand elsewhere.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Our AI chatting system responds in your voice, 24/7, and converts at 3x the rate of manual responses. Why? Because subscribers get instant, personalized attention every time.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      We only take 20% commission — the lowest in the industry. And if you're not happy, you can cancel anytime. No contracts.
    </p>
    <div style="text-align:center;">
      <a href="${SITE_URL}/calculator" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Calculate Your Earnings Potential</a>
    </div>`,
        email
      ),
  },
  {
    subject: "What 20% commission actually looks like",
    delayHours: 168,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Let's talk numbers${name ? `, ${name}` : ""}</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Some agencies charge 50-70%. We charge 20%. Here's what that means for you:
    </p>
    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="color:#91919f;font-size:14px;">If you earn $5,000/mo</span>
        <span style="color:#fff;font-size:14px;font-weight:600;">You keep $4,000</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="color:#91919f;font-size:14px;">If you earn $10,000/mo</span>
        <span style="color:#fff;font-size:14px;font-weight:600;">You keep $8,000</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:12px 0;">
        <span style="color:#91919f;font-size:14px;">If you earn $25,000/mo</span>
        <span style="color:#fff;font-size:14px;font-weight:600;">You keep $20,000</span>
      </div>
    </div>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      And remember — most of our creators earn 3-10x more with us than on their own. So even after our commission, you'll likely be making significantly more than you are now.
    </p>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Start Growing Today</a>
    </div>`,
        email
      ),
  },
  {
    subject: "Last chance: Limited spots available this month",
    delayHours: 336,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">${name ? `${name}, w` : "W"}e'd love to work with you</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      This is the last email in our welcome series, and we wanted to make it count.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      To maintain quality, we only onboard a limited number of new creators each month. If you've been thinking about it, now's the time.
    </p>
    <div style="background:#1a1a1f;border-radius:12px;padding:24px;margin-bottom:20px;">
      <p style="color:#fff;font-size:16px;font-weight:600;margin-bottom:12px;">Here's what you get:</p>
      <ul style="color:#d9d9de;font-size:14px;line-height:2;padding-left:16px;">
        <li>AI-powered 24/7 chat management</li>
        <li>Revenue optimization & pricing strategy</li>
        <li>Personalized content calendar</li>
        <li>Cross-platform marketing</li>
        <li>Real-time analytics dashboard</li>
        <li>All for just 20% commission — no contracts</li>
      </ul>
    </div>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Apply Now — 2 Minutes</a>
    </div>`,
        email
      ),
  },
];

// === APPLICATION FOLLOW-UP SEQUENCE ===
// 3 emails over 7 days after applying

export const APPLICATION_SEQUENCE: SequenceEmail[] = [
  {
    subject: "Your application is being reviewed",
    delayHours: 24,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Great news${name ? `, ${name}` : ""}!</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Our team is reviewing your application. While you wait, here's how to get a head start:
    </p>
    <ol style="color:#d9d9de;font-size:15px;line-height:2;padding-left:20px;margin-bottom:24px;">
      <li>Make sure your OnlyFans profile bio is up to date</li>
      <li>Think about your content goals for the next 90 days</li>
      <li>Check out our <a href="${SITE_URL}/blog" style="color:#c5a55a;">blog</a> for growth strategies</li>
    </ol>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;">
      We'll have an update for you soon!
    </p>`,
        email
      ),
  },
  {
    subject: "Tips to maximize your first month with us",
    delayHours: 72,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Preparing for success${name ? `, ${name}` : ""}</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Once you're onboarded, here's what the first 30 days typically look like for our creators:
    </p>
    <div style="margin-bottom:20px;">
      <div style="padding:16px;border-left:3px solid #c5a55a;margin-bottom:12px;">
        <p style="color:#c5a55a;font-size:13px;font-weight:600;margin-bottom:4px;">WEEK 1</p>
        <p style="color:#d9d9de;font-size:14px;">Profile audit, pricing optimization, AI chat training on your voice</p>
      </div>
      <div style="padding:16px;border-left:3px solid #c5a55a;margin-bottom:12px;">
        <p style="color:#c5a55a;font-size:13px;font-weight:600;margin-bottom:4px;">WEEK 2-3</p>
        <p style="color:#d9d9de;font-size:14px;">Content calendar execution, cross-platform promotion begins</p>
      </div>
      <div style="padding:16px;border-left:3px solid #c5a55a;">
        <p style="color:#c5a55a;font-size:13px;font-weight:600;margin-bottom:4px;">WEEK 4</p>
        <p style="color:#d9d9de;font-size:14px;">First results visible — most creators see 50-200% growth</p>
      </div>
    </div>`,
        email
      ),
  },
  {
    subject: "Have questions about your application?",
    delayHours: 168,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">We're here to help${name ? `, ${name}` : ""}</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Just checking in on your application! If you have any questions about the process or our services, don't hesitate to reach out.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      You can also chat with our AI assistant anytime at <a href="${SITE_URL}" style="color:#c5a55a;">elatedagency.com</a> — it knows everything about how we work.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      We're excited about the possibility of working together!
    </p>
    <div style="text-align:center;">
      <a href="mailto:info@elatedagency.com" style="display:inline-block;background:transparent;color:#c5a55a;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;border:1px solid rgba(197,165,90,0.4);">Reply to This Email</a>
    </div>`,
        email
      ),
  },
];

// === CHATBOT RE-ENGAGEMENT SEQUENCE ===
// 3 emails over 8 days for visitors who gave email through chatbot

export const CHATBOT_SEQUENCE: SequenceEmail[] = [
  {
    subject: "Continuing our conversation...",
    delayHours: 4,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Thanks for chatting with us${name ? `, ${name}` : ""}!</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      We noticed you were asking some great questions on our site. In case you didn't get all the info you needed, here's a quick summary of what Elated offers:
    </p>
    <ul style="color:#d9d9de;font-size:15px;line-height:2;padding-left:20px;margin-bottom:24px;">
      <li><strong style="color:#fff;">20% commission</strong> — lowest in the industry</li>
      <li><strong style="color:#fff;">No contracts</strong> — cancel anytime</li>
      <li><strong style="color:#fff;">AI chat management</strong> — 24/7 subscriber engagement</li>
      <li><strong style="color:#fff;">3-10x revenue growth</strong> — average in 90 days</li>
    </ul>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Learn More</a>
    </div>`,
        email
      ),
  },
  {
    subject: "Quick read: How our creators 5x their income",
    delayHours: 72,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Real results from real creators</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Here's what some of our creators have to say:
    </p>
    <div style="background:#1a1a1f;border-radius:12px;padding:20px;margin-bottom:16px;">
      <p style="color:#d9d9de;font-size:14px;font-style:italic;line-height:1.7;">"I was making $3K a month on my own. Two months with Elated and I hit $18K. Their AI chat system is a game changer."</p>
      <p style="color:#91919f;font-size:13px;margin-top:8px;">— Creator, joined 6 months ago</p>
    </div>
    <div style="background:#1a1a1f;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#d9d9de;font-size:14px;font-style:italic;line-height:1.7;">"The 20% commission is nothing compared to what I was paying my old agency. And the results are 10x better."</p>
      <p style="color:#91919f;font-size:13px;margin-top:8px;">— Creator, joined 4 months ago</p>
    </div>
    <div style="text-align:center;">
      <a href="${SITE_URL}/apply" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Apply in 2 Minutes</a>
    </div>`,
        email
      ),
  },
  {
    subject: "Your personalized earnings estimate",
    delayHours: 192,
    html: (email, name) =>
      emailWrapper(
        `<h1 style="color:#c5a55a;font-size:24px;margin-bottom:16px;">Curious what you could earn${name ? `, ${name}` : ""}?</h1>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:16px;">
      Use our free earnings calculator to see how much more you could be making with professional management.
    </p>
    <p style="color:#d9d9de;font-size:15px;line-height:1.7;margin-bottom:24px;">
      It only takes 30 seconds and there's no commitment — just enter your current stats and see the potential.
    </p>
    <div style="text-align:center;margin-bottom:16px;">
      <a href="${SITE_URL}/calculator" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 36px;border-radius:9999px;text-decoration:none;font-size:15px;">Calculate My Earnings</a>
    </div>
    <p style="color:#91919f;font-size:13px;text-align:center;">
      Ready to get started? <a href="${SITE_URL}/apply" style="color:#c5a55a;">Apply here</a>
    </p>`,
        email
      ),
  },
];

// Map campaign types to their sequences
export const SEQUENCES: Record<string, SequenceEmail[]> = {
  welcome: WELCOME_SEQUENCE,
  application: APPLICATION_SEQUENCE,
  chatbot: CHATBOT_SEQUENCE,
};
