import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Security best practice: same response for non-existing emails
      return NextResponse.json({ success: true, message: "If email exists, reset link sent" });
    }

    // Create JWT token for reset
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "15m" });
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TaskFlow" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Reset your password",
      html: `
        <p>You requested to reset your password.</p>
        <p><a href="${resetLink}">Click here to reset</a></p>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}