"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";

export function LoginForm () {
    const [state, action, pending] = useActionState(login, undefined);
    
    return (
        <form action={action}>
            <div>
                <label htmlFor="email" className="px-5 pr-13">Email</label>
                <input id="email" name="email" placeholder="Email" type="email" className="" required />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor="password" className="px-5">Password</label>
                <input id="password" name="password" placeholder="Password" type="password" required />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button disabled={pending} type="submit" className="px-5">Log In</button>
        </form>
    );
}
