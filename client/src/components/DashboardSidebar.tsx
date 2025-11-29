import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Activity, 
  CalendarDays, 
  Users, 
  Timer, 
  Trophy, 
  Settings,
  LogOut,
  Plus
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SettingsModal } from "./SettingsModal";

const NAV_ITEMS = [
  { label: "Habits", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Analytics", icon: Activity, href: "/dashboard/analytics" },
  { label: "Kalender", icon: CalendarDays, href: "/dashboard/calendar" },
  { label: "Sosial", icon: Users, href: "/dashboard/social" },
  { label: "Pomodoro", icon: Timer, href: "/dashboard/pomodoro" },
  { label: "Rewards", icon: Trophy, href: "/dashboard/rewards" },
];

export function DashboardSidebar() {
  const [location] = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="w-64 h-screen flex flex-col border-r border-white/5 bg-sidebar text-sidebar-foreground hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center text-white font-bold">W</div>
          <span className="font-bold text-lg tracking-tight">WasaHabitly</span>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}>
                  <item.icon className={cn("h-4 w-4", isActive ? "text-accent" : "text-muted-foreground")} />
                  {item.label}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-9 w-9 border border-white/10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Walid Sathosi Sirait</p>
            <p className="text-xs text-muted-foreground truncate">wasasi@example.com</p>
          </div>
        </div>
        <div className="flex gap-1">
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => setSettingsOpen(true)}
             className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
             data-testid="button-settings"
           >
             <Settings className="h-4 w-4" />
           </Button>
        </div>
        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </div>
  );
}
