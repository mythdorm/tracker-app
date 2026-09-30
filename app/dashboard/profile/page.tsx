import { UserIcon } from "@heroicons/react/24/outline";
import { getUser } from "@/app/lib/dal";

export default async function Page () {
    const user = await getUser();

    return (
        <main>
            <div className="flex gap-10">
                <div>
                    <UserIcon className="h-30 w-30"/>
                </div>
                
                <div className="justify-center items-center flex h-30">
                    <h1 className="text-[30pt]">{user?.name ?? "Profile Settings"}</h1>
                </div>
            </div>
        </main>
    );
}