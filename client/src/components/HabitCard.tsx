import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Flame, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { HabitDetailModal } from "./HabitDetailModal";

interface HabitCardProps {
  id?: number;
  title: string;
  description?: string;
  streak: number;
  completed: boolean;
  color?: string;
  icon?: React.ReactNode;
  onComplete?: () => void;
  onEdit?: (habit: any) => void;
  onDelete?: (id: number) => void;
}

export function HabitCard({ 
  id = 0,
  title, 
  description, 
  streak, 
  completed, 
  color = "bg-accent", 
  icon,
  onComplete,
  onEdit,
  onDelete
}: HabitCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -2 }}
        className={cn(
          "group relative p-5 rounded-2xl border border-white/5 bg-card/40 backdrop-blur-sm hover:border-white/10 transition-all duration-300",
          completed && "bg-accent/5 border-accent/20"
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg", color)}>
              {icon || <div className="w-4 h-4 rounded-full bg-white/30" />}
            </div>
            <div>
              <h3 className={cn("font-semibold text-lg leading-none mb-1", completed && "text-accent")}>
                {title}
              </h3>
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setIsDetailOpen(true)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            <Flame className={cn("h-4 w-4", streak > 0 ? "text-orange-500 fill-orange-500" : "text-muted-foreground")} />
            <span>{streak} hari streak</span>
          </div>

          <Button
            onClick={onComplete}
            size="sm"
            variant={completed ? "default" : "outline"}
            className={cn(
              "rounded-full h-9 px-4 transition-all duration-300",
              completed 
                ? "bg-accent hover:bg-accent/90 text-white shadow-[0_0_15px_-3px_rgba(26,188,156,0.4)]" 
                : "border-white/10 hover:border-accent/50 hover:text-accent hover:bg-accent/5"
            )}
          >
            {completed ? (
              <>
                <Check className="h-4 w-4 mr-1.5" /> Selesai
              </>
            ) : (
              "Check-in"
            )}
          </Button>
        </div>

        {/* Progress bar background */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 rounded-b-2xl overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: completed ? "100%" : `${Math.min(streak * 5, 100)}%` }}
            className={cn("h-full", color)}
          />
        </div>
      </motion.div>

      <HabitDetailModal 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        habit={{ id, title, description, streak }}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}
