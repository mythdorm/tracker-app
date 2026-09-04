import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect("/login");
    }

    return { isAuth: true, userId: session.userId as string };
})

export const getUser = cache(async () => {
    const session = await verifySession();
    if (!session) {
        return null;
    }

    const id: string = session.userId

    try {
        const data = await db.query.users.findMany({
            where: eq(users.id, id),
            columns: {
                id: true,
                name: true,
                email: true
            }
        })

        const user = data[0];
        return user;
    } catch (error) {
        console.log("Failed to fetch user" + error);
        return null;
    }
})