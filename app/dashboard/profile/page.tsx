import { UserIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { getUser } from "@/app/lib/dal";
import { UpdateProfileForm } from "@/app/ui/update-profile-form";
import Link from "next/link";

export default async function Page () {
    let user = await getUser();

    if (!user) {
        user = {
            id: "",
            name: "Profile Settings",
            email: ""
        }
    }

    // Onion below LMAO
    return (
        <main>
            <div className="flex flex-col gap-20 sm:gap-10">
                <div>
                    <div className="flex gap-8 items-center">
                        <div>
                            <UserIcon className="h-15 w-15 sm:h-20 sm:w-20 md:h-30 md:w-30"/>
                        </div>

                        <div className="justify-center items-center flex h-30">
                            <p className="text-[24pt] md:text-[30pt] ">{user?.name ?? "Profile Settings"}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center hover:underline mt-5 ml-3 w-fit">
                        <div><ChevronLeftIcon className="h-5 w-5" /></div>
                        <div>
                            <Link href="/dashboard" className="text-white hover:underline">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                

                <div className="flex flex-col gap-5 w-full justify-center items-center">
                    <UpdateProfileForm user={user} />
                </div>
            </div>
        </main>
    );
}