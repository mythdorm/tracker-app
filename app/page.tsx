import Image from "next/image";
import TopNav from "@/app/ui/topnav";
import { Button } from "@/app/ui/button";
import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full justify-center flex-col items-center">
        <TopNav />
        <div className="font-bold text-5xl pt-5">Tasks App</div>
        <div className="flex items-center">
          <Link href="/login" className="px-5">
            <Button className="w-25 my-5 border-white border-2 hover:border-green-500">
              <p className="w-full text-center">Log In</p>
            </Button>
          </Link>
          <Link href="/signup" className="px-5">
            <Button className="w-25 my-5 border-white border-2 hover:border-green-500">
              <p className="w-full text-center">Sign Up</p>
            </Button>
          </Link>
        </div>
        <div className="flex items-center">
          <Image src="/full-logo.svg" alt="Legendary Pulls Software" width={2000} height={2000} className="w-40 h-40" loading="eager" />
          <p> by Legendary Pulls Software</p>
        </div>
      </main>
    </div>
  );
}
