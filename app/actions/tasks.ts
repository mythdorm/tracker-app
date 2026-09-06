"use server";

import { SetStateAction } from "react";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import { tasks } from "@/app/db/schema"
import { getUser, verifySession } from "../lib/dal";
import { eq, and } from "drizzle-orm";

export type Task = {
    id: string,
    title: string,
    description: string | null,
}

export async function createTask(name: string, description:string) {
    const user = await getUser();

    if (!user) {
        return {
            message: "Unable to verify user",
        }
    }

    const data = await db.insert(tasks).values({
        title: name,
        description,
        status: "pending",
        userId: user.id,
    }).returning({ id: tasks.id, title: tasks.title, description: tasks.description })

    const task: Task = {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description
    };

    if (!task) {
        return {
            message: "Failed to create task"
        }
    }

    return task;
}

export async function getTasks () {
    const user = await getUser();

    if (!user) {
        const t: Task[] = [{id: "", title: "", description: ""}];
        return t;
    }

    const data = await db.query.tasks.findMany({
        where: eq(tasks.userId, user.id),
        columns: {
            id: true,
            title: true,
            description: true,
        }
    })

    var tasksArray: Task[] = [];

    for (let i: number = 0; i < data.length; i++) {
        const newTask: Task = {
            id: data[i].id,
            title: data[i].title,
            description: data[i].description
        }
        tasksArray.push(newTask);
    }

    return tasksArray;
}

export async function deleteTask(taskId: string) {
    const user = await getUser();

    if (!user) {
        return {
            message: "Failed to verify user"
        }
    }

    const data = await db.delete(tasks).where(
        and(
            eq(tasks.userId, user.id),
            eq(tasks.id, taskId)
        )
    ).returning({ id: tasks.id, title: tasks.title, description: tasks.description });

    if (!data) {
        return {
            message: "Failed to delete task"
        }
    }
}