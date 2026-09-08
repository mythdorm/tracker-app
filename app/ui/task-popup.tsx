"use client";

import { useState } from "react";
import Popup from "@/app/ui/popup";
import { TaskForm } from "./task-form";

interface TaskPopupProps {
    created: (id: string, name: string, description:string) => void
}

export default function TaskPopup ({ created }: TaskPopupProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function create (id: string, name: string, description: string) {
        setIsPopupOpen(false);
        created(id, name, description);
    }

    return (
        <div>
            <button onClick={() => {setIsPopupOpen(true)}} className="bg-blue-400 rounded m-2 w-9/100 hover:bg-blue-500">Create Task</button>
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} >
                <h1 className="text-xl font-semibold mb-2 text-gray-700">New Task</h1>

                <TaskForm onSubmit={create}/>

            </Popup>
        </div>
    )
}