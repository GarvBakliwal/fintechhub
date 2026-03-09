import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
    try {
        // Also call backend logout to clear backend cookie
        await fetch(`${BACKEND_URL}/api/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).catch(() => {
            // Ignore backend errors — clearing frontend cookie is what matters
        });

        const response = NextResponse.json({
            message: "Logged out successfully",
        });

        // Clear the frontend cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0, // Expire immediately
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Logout failed" },
            { status: 500 }
        );
    }
}
