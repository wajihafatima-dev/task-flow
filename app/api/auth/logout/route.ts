import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";
/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public (requires session cookie)
*/
export async function POST(req: NextRequest) {
    try {
        const sessionToken = req.cookies.get("session")?.value;
        if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "No session found" },
        { status: 400 }
      );
    }
    await prisma.session.deleteMany({
      where: { token: sessionToken },
    });
    // Clear cookie
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    
    response.cookies.set("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      maxAge: 0,
    });

    return response;
} catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
    );
}
}