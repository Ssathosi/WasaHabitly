import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Route, Switch, useLocation } from "wouter";
import HabitsPage from "./HabitsPage.tsx";
import AnalyticsPage from "./AnalyticsPage.tsx";
import PomodoroPage from "./PomodoroPage.tsx";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Dashboard() {
  const [location] = useLocation();

  const getTitle = () => {
    if (location.includes("analytics")) return "Analytics";
    if (location.includes("calendar")) return "Kalender";
    if (location.includes("pomodoro")) return "Pomodoro Focus";
    return "Habits Saya";
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for Desktop */}
      <DashboardSidebar />

      {/* Mobile Sidebar */}
      <Sheet>
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-white/10">
                <DashboardSidebar />
              </SheetContent>
              
              <h1 className="text-xl font-semibold tracking-tight">{getTitle()}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border border-background" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 scroll-smooth">
             <div className="max-w-6xl mx-auto">
                <Switch>
                  <Route path="/dashboard" component={HabitsPage} />
                  <Route path="/dashboard/analytics" component={AnalyticsPage} />
                  <Route path="/dashboard/pomodoro" component={PomodoroPage} />
                  <Route path="/dashboard/calendar">
                    <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Kalender (Coming Soon)</div>
                  </Route>
                  <Route path="/dashboard/social">
                    <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Sosial (Coming Soon)</div>
                  </Route>
                  <Route path="/dashboard/rewards">
                    <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Rewards (Coming Soon)</div>
                  </Route>
                  {/* Fallback for /dashboard/* that doesn't match above */}
                  <Route>
                    <div className="flex items-center justify-center h-64 text-muted-foreground">Halaman tidak ditemukan</div>
                  </Route>
                </Switch>
             </div>
          </main>
        </div>
      </Sheet>
    </div>
  );
}
