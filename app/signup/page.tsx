import { SignupForm } from "@/app/ui/signup-form";
import { Suspense } from "react";

export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <Suspense>
                <SignupForm />
            </Suspense>
        </main>
    );
}