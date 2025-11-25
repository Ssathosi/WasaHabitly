import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Route, Switch, useLocation, Router } from "wouter";
import HabitsPage from "./HabitsPage";
import AnalyticsPage from "./AnalyticsPage";
import PomodoroPage from "./PomodoroPage";
import { Button } from "@/components/ui/button";
import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
                {/* Nested Router for Dashboard paths */}
                <Router base="/dashboard">
                  <Switch>
                    <Route path="/" component={HabitsPage} />
                    <Route path="/analytics" component={AnalyticsPage} />
                    <Route path="/pomodoro" component={PomodoroPage} />
                    <Route path="/calendar">
                      <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Kalender (Coming Soon)</div>
                    </Route>
                    <Route path="/social">
                      <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Sosial (Coming Soon)</div>
                    </Route>
                    <Route path="/rewards">
                      <div className="flex items-center justify-center h-64 text-muted-foreground">Fitur Rewards (Coming Soon)</div>
                    </Route>
                    
                    {/* Fallback for unknown dashboard routes */}
                    <Route>
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <p className="mb-4">Halaman tidak ditemukan</p>
                        <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Kembali ke Dashboard</Button>
                      </div>
                    </Route>
                  </Switch>
                </Router>
             </div>
          </main>
        </div>
      </Sheet>
    </div>
  );
}
