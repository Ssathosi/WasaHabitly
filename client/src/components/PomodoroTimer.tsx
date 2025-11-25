import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface PomodoroTimerProps {
  focusDuration?: number;
  shortDuration?: number;
  longDuration?: number;
  onSettingsChange?: (focus: number, short: number, long: number) => void;
}

export function PomodoroTimer({
  focusDuration = 25,
  shortDuration = 5,
  longDuration = 15,
  onSettingsChange
}: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");
  const [showSettings, setShowSettings] = useState(false);
  const [customFocus, setCustomFocus] = useState(focusDuration);
  const [customShort, setCustomShort] = useState(shortDuration);
  const [customLong, setCustomLong] = useState(longDuration);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "focus") setTimeLeft(customFocus * 60);
    else if (mode === "short") setTimeLeft(customShort * 60);
    else setTimeLeft(customLong * 60);
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
    if (newMode === "focus") setTimeLeft(customFocus * 60);
    else if (newMode === "short") setTimeLeft(customShort * 60);
    else setTimeLeft(customLong * 60);
  };

  const saveSettings = () => {
    if (customFocus > 0 && customShort > 0 && customLong > 0) {
      onSettingsChange?.(customFocus, customShort, customLong);
      resetTimer();
      setShowSettings(false);
    }
  };

  const totalDuration = mode === "focus" ? customFocus * 60 : mode === "short" ? customShort * 60 : customLong * 60;
  const progress = 100 - (timeLeft / totalDuration) * 100;

  if (showSettings) {
    return (
      <div className="p-8 rounded-3xl bg-card/30 border border-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Kustomisasi Timer</h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowSettings(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Durasi Fokus (menit)
            </label>
            <Input
              type="number"
              min="1"
              max="60"
              value={customFocus}
              onChange={(e) => setCustomFocus(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Durasi Break Kecil (menit)
            </label>
            <Input
              type="number"
              min="1"
              max="30"
              value={customShort}
              onChange={(e) => setCustomShort(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Durasi Break Panjang (menit)
            </label>
            <Input
              type="number"
              min="1"
              max="60"
              value={customLong}
              onChange={(e) => setCustomLong(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={saveSettings}
              className="flex-1 bg-accent hover:bg-accent/90 text-white"
            >
              Simpan
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              variant="outline"
              className="flex-1 border-white/10"
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10"
          onClick={() => setShowSettings(true)}
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
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
