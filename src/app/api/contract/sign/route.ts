import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = (session.user as { id?: string }).id;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { signature, terms, commission, startDate, endDate } = body;

    if (!signature) {
      return NextResponse.json(
        { error: "Signature is required" },
        { status: 400 }
      );
    }

    // Get the client IP address from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded?.split(",")[0]?.trim() || "unknown";

    const contract = await prisma.contract.create({
      data: {
        userId,
        signature,
        terms: terms || null,
        commission: commission || 20,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        signedAt: new Date(),
        status: "signed",
        ipAddress,
      },
    });

    // Update the user's contract status
    await prisma.user.update({
      where: { id: userId },
      data: {
        contractSigned: true,
        contractDate: new Date(),
        status: "active",
      },
    });

    // Fetch user for email
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "Contract Signed - Elated Agency",
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
                <h1 style="color:#c5a55a;font-size:28px;margin-bottom:20px;">Contract Signed!</h1>
                <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
                  Hey ${user.name || "Creator"}, your management contract has been successfully signed.
                </p>
                <p style="color:#d9d9de;font-size:16px;line-height:1.6;margin-bottom:20px;">
                  <strong style="color:#fafafa;">Contract Details:</strong>
                </p>
                <ul style="color:#d9d9de;font-size:16px;line-height:1.8;padding-left:20px;margin-bottom:30px;">
                  <li>Contract ID: ${contract.id}</li>
                  <li>Commission Rate: ${contract.commission}%</li>
                  <li>Start Date: ${contract.startDate?.toLocaleDateString() || "Immediate"}</li>
                  <li>Status: Active</li>
                </ul>
                <p style="color:#d9d9de;font-size:16px;line-height:1.6;">
                  Our team will begin your onboarding process shortly. Welcome aboard!
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
    }

    return NextResponse.json(
      {
        contractId: contract.id,
        status: contract.status,
        signedAt: contract.signedAt,
        message: "Contract signed successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contract signing error:", error);
    return NextResponse.json(
      { error: "An error occurred while signing the contract" },
      { status: 500 }
    );
  }
}
