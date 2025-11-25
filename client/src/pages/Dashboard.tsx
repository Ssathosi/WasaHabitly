import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MobileSidebar } from "@/components/MobileSidebar";
import { Route, Switch, useLocation } from "wouter";
import HabitsPage from "./HabitsPage";
import AnalyticsPage from "./AnalyticsPage";
import PomodoroPage from "./PomodoroPage";
import SocialPage from "./SocialPage";
import CalendarPage from "./CalendarPage";
import RewardsPage from "./RewardsPage";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Dashboard() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getTitle = () => {
    if (location.includes("analytics")) return "Analytics";
    if (location.includes("calendar")) return "Kalender";
    if (location.includes("pomodoro")) return "Pomodoro Focus";
    if (location.includes("social")) return "Komunitas";
    if (location.includes("rewards")) return "Rewards & Achievements";
    return "Habits Saya";
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar for Desktop */}
      <DashboardSidebar />

      {/* Mobile Sidebar + Main Content */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r border-white/10">
                <MobileSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
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
                  <Route path="/dashboard/social" component={SocialPage} />
                  <Route path="/dashboard/calendar" component={CalendarPage} />
                  <Route path="/dashboard/rewards" component={RewardsPage} />
                  
                  {/* Fallback for unknown dashboard routes */}
                  <Route>
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                      <p className="mb-4">Halaman tidak ditemukan</p>
                      <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Kembali ke Dashboard</Button>
                    </div>
                  </Route>
                </Switch>
             </div>
          </main>
        </div>
      </Sheet>
    </div>
  );
}
