import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "focus") setTimeLeft(25 * 60);
    else if (mode === "short") setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const setModeAndReset = (newMode: "focus" | "short" | "long") => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === "focus") setTimeLeft(25 * 60);
    else if (newMode === "short") setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const progress = 100 - (timeLeft / (mode === "focus" ? 1500 : mode === "short" ? 300 : 900)) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-card/30 border border-white/5 backdrop-blur-md relative overflow-hidden">
      {/* Background Pulse */}
      {isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.05, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 rounded-full bg-accent/20 blur-3xl"
          />
        </div>
      )}

      <div className="flex gap-2 mb-8 z-10">
        <Button
          variant={mode === "focus" ? "default" : "ghost"}
          onClick={() => setModeAndReset("focus")}
          className={cn("rounded-full", mode === "focus" && "bg-accent text-white")}
        >
          Fokus
        </Button>
        <Button
          variant={mode === "short" ? "default" : "ghost"}
          onClick={() => setModeAndReset("short")}
          className={cn("rounded-full", mode === "short" && "bg-teal-600 text-white")}
        >
          Break Kecil
        </Button>
        <Button
          variant={mode === "long" ? "default" : "ghost"}
          onClick={() => setModeAndReset("long")}
          className={cn("rounded-full", mode === "long" && "bg-blue-600 text-white")}
        >
          Break Panjang
        </Button>
      </div>

      <div className="relative z-10 mb-8">
        <div className="text-8xl font-bold tracking-tighter tabular-nums text-foreground drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        <p className="text-center text-muted-foreground mt-2 uppercase tracking-widest text-xs font-medium">
          {isActive ? "Sedang Berjalan" : "Siap Mulai"}
        </p>
      </div>

      <div className="flex items-center gap-4 z-10">
        <Button
          size="lg"
          className="h-16 w-16 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
          onClick={toggleTimer}
        >
          {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10"
          onClick={resetTimer}
        >
          <RotateCcw className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Progress Ring */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
        <motion.div 
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>
    </div>
  );
}
