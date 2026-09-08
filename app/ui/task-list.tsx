"use client";

import { useEffect, useState, use } from "react";
import { getTasks, Task, deleteTask } from "@/app/actions/tasks";
import TaskPopup from "./task-popup";
import TaskElement from "./task-element";

export default function TaskList () {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    async function handleCreate(id: string, name: string, description: string) {
        const newTask: Task = {
            id,
            title: name,
            description
        }
        setTasks((prev) => [...prev, newTask]);
    }

    async function handleDelete(id:string) {
        const task = await deleteTask(id);
        if (task) return task;
        setTasks((prev) => prev.filter(item => item.id != id));
    }

    useEffect(() => {
        getTasks().then((data) => {
            setTasks(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>
    return(
        <div className="w-95/100 pl-2">
            <TaskPopup created={handleCreate}/>

            <ul>
                {tasks.map((t, i) => (
                    <li key={i} id={t.id}> 
                        {/* <button onClick={() => handleDelete(t.id)}>{t.title}</button> */}
                        
                        <TaskElement title={t.title} description={t.description} status={"pending"} toDelete={() => handleDelete(t.id)} thisId={t.id} />
                    </li>
                ))}
            </ul>
        </div>
        
    ) 
}

// export default function TaskList ({ initialTasks }: { initialTasks: Task[] }) {
//     const [tasks, setTasks] = useState(initialTasks);
//     // const tasks = use(initialTasks);

//     return (
//         <ul>
//             {tasks.map((t, i) => ()
//                 <li key={i}> {t.title}</li>
//             ))}
//         </ul>
//     )
// } 