"use client";

import { useActionState } from "react";
import { updateUser } from "@/app/actions/auth";

export function UpdateProfileForm({ user }: { user?: { name?: string; email?: string } }) {
    const [state, action, pending] = useActionState(updateUser, undefined);

    const fontStyle = "text-lg md:text-xl";
    return (
        <form action={action}>
            <div className={fontStyle}>
                <label htmlFor="name" className="mr-2">Name</label>
                <input id="name" name="name" defaultValue={user?.name ?? ""} />
            </div>
            {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}

            <div className={fontStyle}>
                <label htmlFor="email" className="mr-2">Email</label>
                <input id="email" name="email" defaultValue={user?.email ?? ""} />
            </div>
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}

            <div className={fontStyle}>
                <label htmlFor="password" className="mr-2">Password</label>
                <input id="password" name="password" placeholder="********" type="password" />
            </div>
            {state?.errors?.password && (
                <div>
                    <p className="text-red-500">Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li className="text-red-500" key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-5/10 flex">
                <div className="flex-initial h-full px-1 mt-2 bg-blue-500 hover:bg-blue-400 rounded border-gray-300 border-1">
                    <button className="" disabled={pending} type="submit">Submit</button>
                </div>
            </div>
        </form>
    )
}