import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase(),
        subject: subject || null,
        message,
      },
    });

    // Send notification email to the agency
    await sendEmail({
      to: "info@elatedagency.com",
      subject: `New Contact Form: ${subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color:#888;font-size:12px;">Submission ID: ${submission.id}</p>
      `,
    });

    // Send confirmation to the submitter
    await sendEmail({
      to: email,
      subject: "We Received Your Message - Elated Agency",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Inter',Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:40px;">
              <img src="https://elatedagency.com/images/logo-full.png" alt="Elated Agency" style="height:40px;" />
            </div>
            <div style="background:#141418;border-radius:16px;padding:40px;border:1px solid rgba(197,165,90,0.2);">
              <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Message Received!</h1>
              <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
                Hey ${name}, thanks for reaching out to Elated Agency! We've received your message
                and our team will get back to you within 24 hours.
              </p>
              <p style="color:#d9d9de;font-size:16px;line-height:1.6;">
                In the meantime, feel free to browse our
                <a href="https://elatedagency.com" style="color:#c5a55a;text-decoration:none;">website</a>
                to learn more about our services.
              </p>
            </div>
            <div style="text-align:center;margin-top:40px;color:#747484;font-size:14px;">
              <p>Elated Agency &mdash; Premium OnlyFans Management</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        id: submission.id,
        message: "Your message has been sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred while sending your message" },
      { status: 500 }
    );
  }
}
