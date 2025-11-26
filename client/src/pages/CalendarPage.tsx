import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import "react-day-picker/dist/style.css";

const HABIT_LOG = {
  "2025-11-25": [
    { id: 1, name: "Minum Air Putih", completed: true },
    { id: 2, name: "Olahraga Pagi", completed: true },
    { id: 3, name: "Membaca Buku", completed: false },
  ],
  "2025-11-24": [
    { id: 1, name: "Minum Air Putih", completed: true },
    { id: 2, name: "Olahraga Pagi", completed: false },
    { id: 3, name: "Membaca Buku", completed: true },
  ],
  "2025-11-23": [
    { id: 1, name: "Minum Air Putih", completed: true },
    { id: 2, name: "Olahraga Pagi", completed: true },
    { id: 3, name: "Membaca Buku", completed: true },
  ],
};

const COLORS = {
  "Minum Air Putih": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Olahraga Pagi": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Membaca Buku": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 25));
  const [view, setView] = useState<"month" | "week">("month");

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const dayHabits = HABIT_LOG[dateKey as keyof typeof HABIT_LOG] || [];
  const completedCount = dayHabits.filter(h => h.completed).length;

  const disabledDays = {
    before: new Date(2025, 10, 1),
    after: new Date(2025, 10, 30),
  };

  const getDayContent = (date: Date) => {
    const key = format(date, "yyyy-MM-dd");
    const habits = HABIT_LOG[key as keyof typeof HABIT_LOG];
    if (!habits) return null;
    
    const completed = habits.filter(h => h.completed).length;
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-sm font-semibold">{format(date, "d")}</span>
        <div className="flex gap-0.5 mt-0.5">
          {Array.from({ length: Math.min(completed, 3) }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-accent rounded-full" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-accent" />
            {format(selectedDate, "MMMM yyyy", { locale: id })}
          </h2>
          <p className="text-muted-foreground text-sm">Lacak kebiasaanmu setiap hari</p>
        </div>

        <Tabs defaultValue="month" onValueChange={(v) => setView(v as "month" | "week")}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="month">Bulan</TabsTrigger>
            <TabsTrigger value="week">Minggu</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 bg-card/30 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base">Kalender Kebiasaan</CardTitle>
          </CardHeader>
          <CardContent>
            <style>{`
              .rdp {
                --rdp-cell-size: 45px;
                --rdp-accent-color: rgb(26, 188, 156);
              }
              @media (min-width: 1024px) {
                .rdp {
                  --rdp-cell-size: 65px;
                }
              }
              .rdp-months {
                width: 100%;
              }
              .rdp-head_cell {
                color: #a1a1a1;
                font-size: 0.875rem;
                font-weight: 600;
                text-transform: uppercase;
              }
              .rdp-cell {
                padding: 0.25rem;
              }
              .rdp-day {
                border-radius: 0.5rem;
                color: #ecf0f1;
                font-weight: 500;
                background: transparent;
              }
              .rdp-day:hover:not([disabled]) {
                background-color: rgba(255,255,255,0.1);
              }
              .rdp-day_selected:not([disabled]) {
                background-color: rgb(26, 188, 156);
                color: white;
                font-weight: bold;
              }
              .rdp-day_disabled {
                color: #4b5563;
                opacity: 0.5;
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={disabledDays}
              showOutsideDays={false}
            />
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="bg-card/30 border-white/5 backdrop-blur-sm h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              <span>Detail Hari</span>
              <Badge variant="outline" className="bg-accent/10 border-accent/30 text-accent">
                {completedCount}/{dayHabits.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-lg">{format(selectedDate, "EEEE", { locale: id })}</p>
              <p className="text-muted-foreground text-sm">{format(selectedDate, "d MMMM yyyy", { locale: id })}</p>
            </div>

            {dayHabits.length > 0 ? (
              <div className="space-y-2">
                {dayHabits.map((habit, idx) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${COLORS[habit.name as keyof typeof COLORS]}`}
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{habit.name}</span>
                    {habit.completed && <span className="ml-auto text-xs">✓</span>}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Tidak ada data untuk hari ini</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Integration */}
      <Card className="bg-gradient-to-r from-accent/10 to-blue-500/10 border-accent/20 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Sinkronisasi dengan Google Calendar</h3>
              <p className="text-sm text-muted-foreground">Otomatis tambahkan habit reminder ke kalender Anda</p>
            </div>
            <Button size="sm" variant="outline" className="border-accent/30 hover:bg-accent/10 text-accent">
              Hubungkan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
