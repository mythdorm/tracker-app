import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listTasks() {
    const data = await sql`
        SELECT tasks.title, users.name
        FROM tasks
        JOIN users ON tasks.user_id = users.id
        WHERE tasks.title = 'Task3'
    `;

    return data;
}

export async function GET() {
    try {
        return Response.json(await listTasks());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}