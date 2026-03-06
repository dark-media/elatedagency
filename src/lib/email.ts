import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  inReplyTo?: string;
  references?: string;
}

export async function sendEmail({ to, subject, html, from, replyTo, inReplyTo, references }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: from || `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
      headers: {
        ...(inReplyTo ? { "In-Reply-To": inReplyTo } : {}),
        ...(references ? { References: references } : {}),
      },
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

export function welcomeEmailTemplate(name: string, dashboardUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:40px;">
          <img src="https://elatedagency.com/images/logo-full.png" alt="Elated Agency" style="height:40px;" />
        </div>
        <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
          <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Welcome to Elated, ${name}!</h1>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
            We're thrilled to have you join the Elated Agency family. Your application has been received
            and our team is reviewing it now.
          </p>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:30px;">
            You'll receive a follow-up within 24 hours with your personalized onboarding plan
            and contract details.
          </p>
          <div style="text-align:center;">
            <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 40px;border-radius:9999px;text-decoration:none;font-size:16px;">
              View Your Dashboard
            </a>
          </div>
        </div>
        <div style="text-align:center;margin-top:40px;color:#747484;font-size:14px;">
          <p>Elated Agency &mdash; Premium OnlyFans Management</p>
          <p style="margin-top:8px;">
            <a href="https://elatedagency.com" style="color:#c5a55a;text-decoration:none;">elatedagency.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function applicationReceivedTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:40px;">
          <img src="https://elatedagency.com/images/logo-full.png" alt="Elated Agency" style="height:40px;" />
        </div>
        <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
          <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Application Received!</h1>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
            Hey ${name}, thanks for applying to Elated Agency! We've received your application
            and our management team will review it within 24 hours.
          </p>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
            <strong style="color:#fafafa;">What happens next:</strong>
          </p>
          <ul style="color:#d9d9de;font-size:16px;line-height:1.8;padding-left:20px;margin-bottom:30px;">
            <li>Our team reviews your profile (24 hours)</li>
            <li>You'll receive a personalized strategy proposal</li>
            <li>Digital contract signing via your dashboard</li>
            <li>Onboarding & account setup begins immediately</li>
          </ul>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;">
            Questions? Reply to this email or reach us at
            <a href="mailto:info@elatedagency.com" style="color:#c5a55a;">info@elatedagency.com</a>
          </p>
        </div>
        <div style="text-align:center;margin-top:40px;color:#747484;font-size:14px;">
          <p>Elated Agency &mdash; Premium OnlyFans Management</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function referralEmailTemplate(referrerName: string, referralLink: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:40px;">
          <img src="https://elatedagency.com/images/logo-full.png" alt="Elated Agency" style="height:40px;" />
        </div>
        <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
          <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">You've Been Invited!</h1>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
            Your friend ${referrerName} thinks you'd be perfect for Elated Agency &mdash;
            the premium OnlyFans management agency that's helping creators earn 3-10x more.
          </p>
          <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:30px;">
            Join today and both you and ${referrerName} earn bonuses.
          </p>
          <div style="text-align:center;">
            <a href="${referralLink}" style="display:inline-block;background:linear-gradient(135deg,#c5a55a,#d4af6a);color:#0a0a0c;font-weight:600;padding:14px 40px;border-radius:9999px;text-decoration:none;font-size:16px;">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
