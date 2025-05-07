import { Button } from "@/components/ui/button";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <p className="w-[70%] text-center">
          Welcome to <strong>Freddie</strong>, a forward-thinking technology
          company focused on creating innovative solutions for modern problems.
        </p>
        <Link href={ApplicationRoutes.Managers}>
          <Button variant="default" className="w-full justify-start">
            Start by viewing all managers
          </Button>
        </Link>
      </main>
    </div>
  );
}
