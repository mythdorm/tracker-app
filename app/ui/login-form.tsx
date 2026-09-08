"use client";

import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm () {
    const [state, action, pending] = useActionState(login, undefined);
    
    return (
        <form action={action} className="w-20/100">
            <div>
                <label htmlFor="email" >Email</label>
                <input id="email" name="email" placeholder="Email" type="email" className="" required />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" placeholder="Password" type="password" required />
            </div>
            {state?.errors?.password && (
                <div className="text-red-500">
                    <p className="text-red-500">Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li className="text-red-500" key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* <button disabled={pending} type="submit" className="px-5">Log In</button> */}
            <div className="w-5/10 flex">
                <div className="flex-initial h-full px-1 mt-2 bg-blue-500 hover:bg-blue-400 rounded border-gray-300 border-1">
                    <button className="" disabled={pending} type="submit">Sign Up</button>
                </div>
                <div className="flex-initial h-full px-1 my-2 ml-2 bg-gray-600 hover:bg-gray-500 rounded border-gray-300 border-1">
                    <Link href="/" className=" cursor-default">Back</Link>
                </div>
            </div>
        </form>
    );
}
