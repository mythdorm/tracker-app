"use server";

import bcrypt from "bcrypt";
import { SignUpFormSchema, LogInFormSchema, FormState } from "@/app/lib/definitions";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call database to create user
    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await db.insert(users).values({
        name,
        email,
        passwordHash: hashedPassword,
    }).returning({ id: users.id});

    const user = data[0];

    if (!user) {
        return {
            message: "Failed to create user",
        }
    }

    // Create user session
    await createSession(user.id);
    // Redirect
    redirect("/dashboard");
}

export async function login (state: FormState, formData: FormData) {
    // Validate fields (maybe)
    const validatedFields = LogInFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    };
    
    // Call database to make sure user exists
    const { email, password } = validatedFields.data;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const data = await db.query.users.findFirst({
        where: eq(users.email, email),
        columns: {
            id: true,
            email: true,
            passwordHash: true,
        }
    })
    
    const user = data;
    if (!user) return { message: "Failed to find a user with that email" };

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) return { message: "Invalid Password" };
    // Create user session
    await createSession(user.id);
    // Redirect
    redirect("/dashboard");
}

export async function logout () {
    await deleteSession();
    redirect("/login");
}