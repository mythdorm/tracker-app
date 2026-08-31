import bcrypt from "bcrypt";
import postgres from "postgres";

import { users, tasks } from "@/app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Database heirarchy:
// Users <- Tasks <- Subtasks
// Subtasks reference tasks which reference users

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING
            `;
        }),
    );

    return insertedUsers;
}

async function seedTasks() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS tasks (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            status VARCHAR(50) NOT NULL,
            date DATE
        )
    `;

    const insertedTasks = await Promise.all(
        tasks.map(async (task) => {
            return sql`
                INSERT INTO tasks (user_id, title, status, date)
                VALUES (${task.user_id}, ${task.title}, ${task.status}, ${task.date})
                ON CONFLICT (id) DO NOTHING
            `;
        })
    );

    return insertedTasks;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
            seedTasks(),
        ]);

        return Response.json({ message: "Seeded database successfully" });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}