import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Heart, Award, Rocket, Shield, Crown, Sparkles, Zap, Smile, Music, BookOpen, Dumbbell, Brain, Target, Clock, Sunset, Moon, Sun, Palette, Code, Cpu, Gem, Cloud, Wind, Leaf, Compass, Map, Eye } from "lucide-react";
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
  { id: 10, title: "Month Master", icon: <Trophy className="h-5 w-5" />, color: "text-purple-500" },
  { id: 11, title: "Three Months", icon: <Crown className="h-5 w-5" />, color: "text-yellow-500" },
  { id: 12, title: "Year of Power", icon: <Award className="h-5 w-5" />, color: "text-red-500" },
  { id: 13, title: "Multi-Tasker", icon: <Zap className="h-5 w-5" />, color: "text-yellow-500" },
  { id: 14, title: "Productivity King", icon: <Rocket className="h-5 w-5" />, color: "text-blue-500" },
  { id: 15, title: "Early Bird", icon: <Sun className="h-5 w-5" />, color: "text-orange-400" },
  { id: 16, title: "Night Owl", icon: <Moon className="h-5 w-5" />, color: "text-indigo-400" },
  { id: 17, title: "Fitness Enthusiast", icon: <Dumbbell className="h-5 w-5" />, color: "text-green-500" },
  { id: 18, title: "Health Guardian", icon: <Heart className="h-5 w-5" />, color: "text-red-400" },
  { id: 19, title: "Knowledge Seeker", icon: <BookOpen className="h-5 w-5" />, color: "text-blue-400" },
  { id: 20, title: "Scholar", icon: <Brain className="h-5 w-5" />, color: "text-purple-400" },
  { id: 21, title: "Creative Mind", icon: <Palette className="h-5 w-5" />, color: "text-pink-400" },
  { id: 22, title: "Influencer", icon: <Star className="h-5 w-5" />, color: "text-yellow-400" },
  { id: 23, title: "Community Leader", icon: <Smile className="h-5 w-5" />, color: "text-pink-400" },
  { id: 24, title: "Heart Collector", icon: <Heart className="h-5 w-5" />, color: "text-red-400" },
  { id: 25, title: "Consistent Streak", icon: <Shield className="h-5 w-5" />, color: "text-slate-400" },
  { id: 26, title: "Unbreakable", icon: <Shield className="h-5 w-5" />, color: "text-slate-500" },
  { id: 27, title: "Diamond Streak", icon: <Gem className="h-5 w-5" />, color: "text-cyan-400" },
  { id: 28, title: "Goal Getter", icon: <Target className="h-5 w-5" />, color: "text-red-500" },
  { id: 29, title: "Ambition Realized", icon: <Rocket className="h-5 w-5" />, color: "text-orange-500" },
  { id: 30, title: "Morning Person", icon: <Sun className="h-5 w-5" />, color: "text-orange-300" },
  { id: 31, title: "Evening Master", icon: <Sunset className="h-5 w-5" />, color: "text-purple-400" },
  { id: 32, title: "Meditation Master", icon: <Brain className="h-5 w-5" />, color: "text-blue-500" },
  { id: 33, title: "Focus King", icon: <Eye className="h-5 w-5" />, color: "text-blue-400" },
  { id: 34, title: "Reading Marathon", icon: <BookOpen className="h-5 w-5" />, color: "text-amber-600" },
  { id: 35, title: "Wellness Champion", icon: <Heart className="h-5 w-5" />, color: "text-green-500" },
  { id: 36, title: "Quick Starter", icon: <Clock className="h-5 w-5" />, color: "text-yellow-500" },
  { id: 37, title: "Dedicated Runner", icon: <Rocket className="h-5 w-5" />, color: "text-orange-500" },
  { id: 38, title: "Water Champion", icon: <Cloud className="h-5 w-5" />, color: "text-blue-400" },
  { id: 39, title: "Sleep Master", icon: <Moon className="h-5 w-5" />, color: "text-indigo-500" },
  { id: 40, title: "Tech Guru", icon: <Code className="h-5 w-5" />, color: "text-green-400" },
  { id: 41, title: "Nature Lover", icon: <Leaf className="h-5 w-5" />, color: "text-green-500" },
  { id: 42, title: "Adventure Seeker", icon: <Compass className="h-5 w-5" />, color: "text-blue-600" },
  { id: 43, title: "Master of All", icon: <Crown className="h-5 w-5" />, color: "text-yellow-500" },
  { id: 44, title: "Legend Status", icon: <Award className="h-5 w-5" />, color: "text-yellow-500" },
  { id: 45, title: "Forever Champion", icon: <Trophy className="h-5 w-5" />, color: "text-yellow-400" },
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
