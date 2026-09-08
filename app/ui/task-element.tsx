"use client";

import { TrashIcon } from "@heroicons/react/24/outline";

interface TaskProps {
    title: string,
    description: string | null,
    status: string,
    toDelete: (id: string) => void,
    thisId: string
}

export default function TaskElement ({ title, description, status, toDelete, thisId }: TaskProps) {
    return (
        <div className="w-full m-2 rounded bg-gray-300">
            <div className="flex m-2 ">
                <p className="text-xl text-bold flex-1 text-black mt-2">{title}</p>
                {/* TODO: Create edititing and setting status to complete */}
                <button className="flex-initial hover:opacity-50" onClick={() => toDelete(thisId)}>
                    <TrashIcon className="w-5 h-5 invert" />
                </button>
            </div>
            <div className="flex">
                <p className="text-black m-2 mt-0">{description}</p>
            </div>
            
        </div>
    )
}