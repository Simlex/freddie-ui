import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Ticket,
  UsersRound,
  Key,
  Briefcase,
  FormInput,
} from "lucide-react";
import { ApplicationRoutes } from "@/constants/applicationRoutes";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12 border-r min-h-screen w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link
            href={ApplicationRoutes.Home}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold">Freddie</span>
          </Link>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            <Link href={ApplicationRoutes.Managers}>
              <Button
                variant={
                  pathname == ApplicationRoutes.Managers ? "default" : "ghost"
                }
                className="w-full justify-start"
              >
                <UsersRound className="mr-2 h-4 w-4" />
                Managers
              </Button>
            </Link>
            <Link href={ApplicationRoutes.Identities}>
              <Button
                variant={pathname == ApplicationRoutes.Identities ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Key className="mr-2 h-4 w-4" />
                Identities
              </Button>
            </Link>
            <Link href={ApplicationRoutes.Jobs}>
              <Button
                variant={pathname == ApplicationRoutes.Jobs ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Jobs
              </Button>
            </Link>
            <Link href={ApplicationRoutes.FormTemplates}>
              <Button
                variant={pathname == ApplicationRoutes.FormTemplates ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <FormInput className="mr-2 h-4 w-4" />
                Form Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
