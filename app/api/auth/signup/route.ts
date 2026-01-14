import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

/**
 * @desc    User Signup
 * @route   POST /api/auth/signup
 * @access  Public
 */
export async function POST(req: Request) {
  try {
    const body: SignupBody = await req.json();
    const { name, email, password } = body;

    /* -------------------- Validation -------------------- */
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    /* -------------------- Check Existing User -------------------- */
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    /* -------------------- Hash Password -------------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* -------------------- Create User -------------------- */
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    /* -------------------- Response -------------------- */
    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
