import { HabitCard } from "@/components/HabitCard";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Droplets, Dumbbell, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const MOCK_HABITS = [
  { id: 1, title: "Minum Air Putih", description: "Target: 8 Gelas", streak: 12, completed: false, icon: <Droplets className="h-5 w-5" />, color: "bg-blue-500" },
  { id: 2, title: "Olahraga Pagi", description: "Minimal 30 menit", streak: 5, completed: true, icon: <Dumbbell className="h-5 w-5" />, color: "bg-orange-500" },
  { id: 3, title: "Membaca Buku", description: "10 Halaman", streak: 24, completed: false, icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-500" },
  { id: 4, title: "Tidur Sebelum 23:00", description: "Istirahat cukup", streak: 3, completed: false, icon: <Moon className="h-5 w-5" />, color: "bg-indigo-500" },
  { id: 5, title: "Bangun Pagi", description: "Jam 05:00", streak: 8, completed: true, icon: <Sun className="h-5 w-5" />, color: "bg-yellow-500" },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState(MOCK_HABITS);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? h.streak : h.streak + 1 } : h));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Hari Ini</h2>
          <p className="text-muted-foreground text-sm">Selasa, 25 November 2025</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20">
          <Plus className="h-4 w-4 mr-2" /> Tambah Habit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit, idx) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <HabitCard
              title={habit.title}
              description={habit.description}
              streak={habit.streak}
              completed={habit.completed}
              color={habit.color}
              icon={habit.icon}
              onComplete={() => toggleHabit(habit.id)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4">Progres Mingguan</h3>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-accent w-[65%] rounded-full" />
        </div>
        <p className="text-right text-sm text-muted-foreground mt-2">65% Target Tercapai</p>
      </div>
    </div>
  );
}
