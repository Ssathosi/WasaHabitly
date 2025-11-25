import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Heart, Award, Rocket, Shield, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Achievement {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface AchievementPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (achievement: Achievement) => void;
}

const AVAILABLE_ACHIEVEMENTS: Achievement[] = [
  { id: 1, title: "First Step", icon: <Trophy className="h-5 w-5" />, color: "text-yellow-400" },
  { id: 2, title: "Week Warrior", icon: <Flame className="h-5 w-5" />, color: "text-orange-400" },
  { id: 3, title: "Habit Master", icon: <Crown className="h-5 w-5" />, color: "text-purple-400" },
  { id: 4, title: "Perfect Week", icon: <Star className="h-5 w-5" />, color: "text-blue-400" },
  { id: 5, title: "Social Butterfly", icon: <Heart className="h-5 w-5" />, color: "text-pink-400" },
  { id: 6, title: "Consistent Legend", icon: <Award className="h-5 w-5" />, color: "text-red-400" },
  { id: 7, title: "Rocket Start", icon: <Rocket className="h-5 w-5" />, color: "text-cyan-400" },
  { id: 8, title: "Iron Shield", icon: <Shield className="h-5 w-5" />, color: "text-slate-400" },
  { id: 9, title: "Superstar", icon: <Sparkles className="h-5 w-5" />, color: "text-amber-300" },
];

export function AchievementPicker({ open, onOpenChange, onSelect }: AchievementPickerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Achievement</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          {AVAILABLE_ACHIEVEMENTS.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                onSelect?.(achievement);
                onOpenChange(false);
              }}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 cursor-pointer transition-all"
            >
              <div className={`flex items-center justify-center mb-2 ${achievement.color}`}>
                {achievement.icon}
              </div>
              <p className="text-xs font-medium text-center text-foreground">{achievement.title}</p>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
