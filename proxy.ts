import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/dashboard/profile"];
const publicRoutes = ["/signup", "/login", "/"];

export default async function proxy (req: NextRequest) {
    // Sets upt the current path and available paths
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // Grabs the cookie and decrypts the session
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    // Checks if the user is on a protected route and isnt signed in
    // Sends them to the login page if so
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}