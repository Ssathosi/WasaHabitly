import { PomodoroTimer } from "@/components/PomodoroTimer";
import { AddTaskModal } from "@/components/AddTaskModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PomodoroPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Menyelesaikan Desain UI", completed: false },
    { id: 2, title: "Review Kode Frontend", completed: true },
    { id: 3, title: "Meeting dengan Tim", completed: false },
  ]);
  
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortDuration, setShortDuration] = useState(5);
  const [longDuration, setLongDuration] = useState(15);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSettingsChange = (focus: number, short: number, long: number) => {
    setFocusDuration(focus);
    setShortDuration(short);
    setLongDuration(long);
  };

  const handleAddTask = (newTask: { title: string }) => {
    const task = {
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      title: newTask.title,
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <PomodoroTimer 
            focusDuration={focusDuration}
            shortDuration={shortDuration}
            longDuration={longDuration}
            onSettingsChange={handleSettingsChange}
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Fokus Hari Ini</h3>
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={cn(
                "p-4 rounded-xl border border-white/5 bg-card/30 hover:bg-card/50 transition-all cursor-pointer flex items-center gap-3",
                task.completed && "opacity-50"
              )}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <span className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                {task.title}
              </span>
            </div>
          ))}
          
          <div 
            onClick={() => setIsTaskModalOpen(true)}
            className="p-4 rounded-xl border border-dashed border-white/10 text-center text-muted-foreground hover:text-foreground hover:border-white/20 cursor-pointer transition-colors"
          >
            + Tambah Tugas Baru
          </div>

          <AddTaskModal open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen} onAdd={handleAddTask} />
        </div>
      </div>
    </div>
  );
}
