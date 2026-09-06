import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt (payload: SessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);
}

export async function decrypt (session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        // Can't verify session 
        // console.log("Failed to verify session");
    }
}

export async function createSession (userId: string) {
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set to expire in 7 days
    const session = await encrypt({ userId, expireAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expireAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function updateSession () {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expire,
        sameSite: "lax",
        path: "/",
    })
}

export async function deleteSession () {
    const cookieStore = await cookies();
    cookieStore.delete("session")
}