import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    // Check for duplicate subscriber
    const existingSubscriber = await prisma.emailSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await prisma.emailSubscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source: source || "website",
      },
    });

    // Send welcome email to the new subscriber
    await sendEmail({
      to: email,
      subject: "Welcome to the Elated Newsletter!",
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
              <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">You're In!</h1>
              <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
                Welcome to the Elated Agency newsletter! You'll receive exclusive insights on:
              </p>
              <ul style="color:#d9d9de;font-size:16px;line-height:1.8;padding-left:20px;margin-bottom:30px;">
                <li>Creator growth strategies & tips</li>
                <li>Industry news & trends</li>
                <li>Exclusive offers for our community</li>
                <li>Success stories from our creators</li>
              </ul>
              <p style="color:#d9d9de;font-size:16px;line-height:1.6;">
                Ready to take your content to the next level?
                <a href="https://elatedagency.com/apply" style="color:#c5a55a;text-decoration:none;">Apply to join Elated</a>
                and let us help you grow.
              </p>
            </div>
            <div style="text-align:center;margin-top:40px;color:#747484;font-size:14px;">
              <p>Elated Agency &mdash; Premium OnlyFans Management</p>
              <p style="margin-top:8px;">
                <a href="https://elatedagency.com/unsubscribe?email=${encodeURIComponent(email)}" style="color:#747484;text-decoration:underline;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        id: subscriber.id,
        message: "Successfully subscribed to the newsletter",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "An error occurred while subscribing" },
      { status: 500 }
    );
  }
}
