import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // Verify token
    const secret = process.env.JWT_SECRET!;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Fetch users
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Protected API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}