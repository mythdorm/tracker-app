import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/outline";

export default function TopNav() {
    return (
        <div className="flex flex-grow w-full h-10 justify-left items-center background-zinc-100 dark:background-zinc-900 text-lg font-bold pt-5">
            <div className="w-10 flex-none justify-items-center">
                {/* <div className="w-full text-center justify-center px-5">L</div>  */}
                {/* Replace the above with an actual logo or icon, but for now a placeholder will do */}
                {/* <Image src="../public/Logo.svg" alt="Legendary Pulls Software" width={2000} height={2000} className="w-10 h-10" /> */}
                {/* <Image src="/semi-logo.svg" alt="Legendary Pulls Software" width={2000} height={2000} className="w-10 h-10" /> */}
                <Image src="/icon0.svg" alt="Legendary Pulls Software" width={945} height={945} className="w-10 h-10 invert" loading="eager" />
            </div>
            <div className="px-5 w-20 flex-1 justify-center items-center">
                <Link href="/">
                    Home
                </Link>
                {/* <Link href="/log-in/signup" className="px-5">
                    Sign Up
                </Link> */}
            </div>
            <div className="flex-none items-center justify-center pr-5">
                <UserIcon className="w-8 h-8" />
            </div>
        </div>
    )
}