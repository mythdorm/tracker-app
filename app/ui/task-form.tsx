"use client";

import { SetStateAction, use, useActionState, useState } from "react";
import { createTask } from "@/app/actions/tasks";

interface TaskProps {
    onSubmit: (id: string, name: string, description: string ) => void
};

export function TaskForm ({onSubmit}: TaskProps) {

    async function submit() {
        const task = await createTask(name, description);
        if ("id" in task) {
            if (task.description === null) {
                task.description = "";
            }
            onSubmit(task.id, task.title, task.description);
        } else {
            return task; // Used to return something so that "state" can be called to display error messages
        }
    }

    const [ state, action, pending ] = useActionState(submit, undefined);
    const [name, nameChange] = useState("");
    const [description, descriptionChange] = useState("");

    return (
        <form action={action}>
            <input type="text" value={name} onChange={(e) => nameChange(e.target.value)} name="task-name" placeholder="Name" className="bg-gray-300 w-full mb-4 text-black pl-2 py-1" required/>
            <input value={description} onChange={(e) => descriptionChange(e.target.value)} name="task-description" placeholder="Description (optional)" className="bg-gray-300 w-full mb-4 text-black pl-2 py-1"/>
            <button disabled={pending} type="submit" className="w-full rounded bg-gray-900 text-white hover:text-gray-300 hover:bg-gray-700">Submit</button>
        </form>
    );
}
