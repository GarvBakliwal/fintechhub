import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    
    const { pathname } = req.nextUrl;

    const isPublicRoute = publicRoutes.includes(pathname);

    // Not authenticated → redirect from protected routes
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Authenticated → prevent visiting auth pages
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/my-banks/:path*",
        "/transaction-history/:path*",
        "/payment-transfer/:path*",
        "/sign-in",
        "/sign-up",
    ],
};