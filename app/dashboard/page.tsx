"use client";

import { logout } from "@/app/actions/auth";
import TopNav from "@/app/ui/topnav";
// Shows up at localhost:3000/dashboard

export default function Page () {
    return (
        <main className="flex">
            <TopNav />
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </main>
    )
}