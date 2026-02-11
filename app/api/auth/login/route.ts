import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { randomUUID } from "crypto";

interface LoginBody {
  email: string;
  password: string;
}

/**
 * @desc    User Login (Session-based only)
 * @route   POST /api/auth/login
 * @access  Public
 */
export async function POST(req: Request) {
  try {
    const body: LoginBody = await req.json();
    const { email, password } = body;

    /* -------------------- Validation -------------------- */
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    /* -------------------- Find User -------------------- */
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* -------------------- Compare Password -------------------- */
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* -------------------- Access Token (SHORT) -------------------- */
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    /* -------------------- Refresh Token (Session Token) -------------------- */
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    /* -------------------- Client Info -------------------- */
    const headersList = await headers();
    const userAgent = headersList.get("user-agent");
    const ipAddress =
      headersList.get("x-forwarded-for")?.split(",")[0] || "unknown";

    /* -------------------- Save Session -------------------- */
    await prisma.session.create({
      data: {
        id: randomUUID(),
        userId: user.id,
        token: refreshToken, // ✅ session token
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress,
        userAgent,
      },
    });

    /* -------------------- Response + Cookie -------------------- */
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token: accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set("session", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}