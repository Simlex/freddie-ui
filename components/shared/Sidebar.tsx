import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Ticket,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  UsersRound,
  Key,
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
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Key className="mr-2 h-4 w-4" />
                Identities
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
            </Link>
            <Link href="/admin/tickets">
              <Button
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Ticket className="mr-2 h-4 w-4" />
                Tickets
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 mt-auto">
          <div className="space-y-1">
            <Link href="/admin/help">
              <Button
                variant={pathname == "" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
