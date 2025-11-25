import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DetailAchievementModal } from "@/components/DetailAchievementModal";
import { Trophy, Zap, Star, Heart, Flame, Award, Gift, Rocket, Shield, Crown, Sparkles, Zap as Lightning, Smile, Music, BookOpen, Dumbbell, Brain, Target, Clock, Sunset, Moon, Sun, Palette, Code, Cpu, Gem, Cloud, Wind, Leaf, Compass, Map, Eye } from "lucide-react";
import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  { id: 1, name: "First Step", description: "Selesaikan 1 hari pertama", icon: <Trophy className="h-6 w-6" />, color: "text-yellow-400", unlocked: true, points: 50 },
  { id: 2, name: "Week Warrior", description: "Mencapai 7 hari streak", icon: <Flame className="h-6 w-6" />, color: "text-orange-400", unlocked: true, points: 100 },
  { id: 3, name: "Habit Master", description: "Mencapai 30 hari streak", icon: <Crown className="h-6 w-6" />, color: "text-purple-400", unlocked: false, points: 250 },
  { id: 4, name: "Perfect Week", description: "Selesaikan semua habit dalam 1 minggu", icon: <Star className="h-6 w-6" />, color: "text-blue-400", unlocked: true, points: 150 },
  { id: 5, name: "Social Butterfly", description: "Berinteraksi dengan 5 teman", icon: <Heart className="h-6 w-6" />, color: "text-pink-400", unlocked: false, points: 120 },
  { id: 6, name: "Consistent Legend", description: "Mencapai 100 hari streak", icon: <Award className="h-6 w-6" />, color: "text-red-400", unlocked: false, points: 500 },
  { id: 7, name: "Rocket Start", description: "Selesaikan 3 habit di hari pertama", icon: <Rocket className="h-6 w-6" />, color: "text-cyan-400", unlocked: true, points: 80 },
  { id: 8, name: "Iron Shield", description: "Tidak melewatkan 1 hari dalam 14 hari", icon: <Shield className="h-6 w-6" />, color: "text-slate-400", unlocked: false, points: 200 },
  { id: 9, name: "Superstar", description: "Dapatkan 100 likes di komunitas", icon: <Sparkles className="h-6 w-6" />, color: "text-amber-300", unlocked: false, points: 300 },
  { id: 10, name: "Month Master", description: "Streak 30 hari tanpa putus", icon: <Trophy className="h-6 w-6" />, color: "text-purple-500", unlocked: false, points: 400 },
  { id: 11, name: "Three Months", description: "Streak 90 hari berturut-turut", icon: <Crown className="h-6 w-6" />, color: "text-gold-400", unlocked: false, points: 600 },
  { id: 12, name: "Year of Power", description: "Streak 365 hari penuh", icon: <Award className="h-6 w-6" />, color: "text-red-500", unlocked: false, points: 1000 },
  { id: 13, name: "Multi-Tasker", description: "Aktifkan 5 habit sekaligus", icon: <Zap className="h-6 w-6" />, color: "text-yellow-500", unlocked: false, points: 150 },
  { id: 14, name: "Productivity King", description: "Selesaikan 10 habit dalam sehari", icon: <Rocket className="h-6 w-6" />, color: "text-blue-500", unlocked: false, points: 200 },
  { id: 15, name: "Early Bird", description: "Selesaikan habit sebelum jam 7 pagi", icon: <Sun className="h-6 w-6" />, color: "text-orange-400", unlocked: false, points: 100 },
  { id: 16, name: "Night Owl", description: "Selesaikan habit setelah jam 10 malam", icon: <Moon className="h-6 w-6" />, color: "text-indigo-400", unlocked: false, points: 100 },
  { id: 17, name: "Fitness Enthusiast", description: "Selesaikan 20 habit olahraga", icon: <Dumbbell className="h-6 w-6" />, color: "text-green-500", unlocked: false, points: 180 },
  { id: 18, name: "Health Guardian", description: "Streak kesehatan 30 hari", icon: <Heart className="h-6 w-6" />, color: "text-red-400", unlocked: false, points: 160 },
  { id: 19, name: "Knowledge Seeker", description: "Belajar 15 hari berturut-turut", icon: <BookOpen className="h-6 w-6" />, color: "text-blue-400", unlocked: false, points: 140 },
  { id: 20, name: "Scholar", description: "Belajar 50 hari total", icon: <Brain className="h-6 w-6" />, color: "text-purple-400", unlocked: false, points: 220 },
  { id: 21, name: "Creative Mind", description: "Selesaikan 10 habit kreatif", icon: <Palette className="h-6 w-6" />, color: "text-pink-400", unlocked: false, points: 130 },
  { id: 22, name: "Influencer", description: "Dapatkan 50 followers di komunitas", icon: <Star className="h-6 w-6" />, color: "text-yellow-400", unlocked: false, points: 250 },
  { id: 23, name: "Community Leader", description: "Berbagi 30 posts di komunitas", icon: <Smile className="h-6 w-6" />, color: "text-pink-400", unlocked: false, points: 200 },
  { id: 24, name: "Heart Collector", description: "Terima 200 likes total", icon: <Heart className="h-6 w-6" />, color: "text-red-400", unlocked: false, points: 300 },
  { id: 25, name: "Consistent Streak", description: "7 hari tanpa melewati satu pun", icon: <Shield className="h-6 w-6" />, color: "text-slate-400", unlocked: false, points: 120 },
  { id: 26, name: "Unbreakable", description: "21 hari tanpa kesalahan sekali pun", icon: <Shield className="h-6 w-6" />, color: "text-slate-500", unlocked: false, points: 280 },
  { id: 27, name: "Diamond Streak", description: "60 hari konsisten sempurna", icon: <Gem className="h-6 w-6" />, color: "text-cyan-400", unlocked: false, points: 400 },
  { id: 28, name: "Goal Getter", description: "Capai 5 target bulanan", icon: <Target className="h-6 w-6" />, color: "text-red-500", unlocked: false, points: 180 },
  { id: 29, name: "Ambition Realized", description: "Capai 20 target berbeda", icon: <Rocket className="h-6 w-6" />, color: "text-orange-500", unlocked: false, points: 350 },
  { id: 30, name: "Morning Person", description: "Selesaikan 30 habit pagi hari", icon: <Sun className="h-6 w-6" />, color: "text-orange-300", unlocked: false, points: 140 },
  { id: 31, name: "Evening Master", description: "Selesaikan 25 habit malam hari", icon: <Sunset className="h-6 w-6" />, color: "text-purple-400", unlocked: false, points: 130 },
  { id: 32, name: "Meditation Master", description: "Selesaikan 30 meditasi", icon: <Brain className="h-6 w-6" />, color: "text-blue-500", unlocked: false, points: 170 },
  { id: 33, name: "Focus King", description: "Selesaikan 50 sesi fokus", icon: <Eye className="h-6 w-6" />, color: "text-blue-400", unlocked: false, points: 190 },
  { id: 34, name: "Reading Marathon", description: "Baca 40 hari berturut-turut", icon: <BookOpen className="h-6 w-6" />, color: "text-amber-600", unlocked: false, points: 210 },
  { id: 35, name: "Wellness Champion", description: "Selesaikan 100 habit kesehatan", icon: <Heart className="h-6 w-6" />, color: "text-green-500", unlocked: false, points: 380 },
  { id: 36, name: "Quick Starter", description: "Selesaikan habit dalam 5 menit", icon: <Clock className="h-6 w-6" />, color: "text-yellow-500", unlocked: false, points: 90 },
  { id: 37, name: "Dedicated Runner", description: "Lari 100 km total", icon: <Rocket className="h-6 w-6" />, color: "text-orange-500", unlocked: false, points: 250 },
  { id: 38, name: "Water Champion", description: "Minum 2L air setiap hari selama 20 hari", icon: <Cloud className="h-6 w-6" />, color: "text-blue-400", unlocked: false, points: 120 },
  { id: 39, name: "Sleep Master", description: "Tidur tepat waktu 30 hari", icon: <Moon className="h-6 w-6" />, color: "text-indigo-500", unlocked: false, points: 160 },
  { id: 40, name: "Tech Guru", description: "Selesaikan 15 habit coding/tech", icon: <Code className="h-6 w-6" />, color: "text-green-400", unlocked: false, points: 180 },
  { id: 41, name: "Nature Lover", description: "Selesaikan 20 habit outdoor", icon: <Leaf className="h-6 w-6" />, color: "text-green-500", unlocked: false, points: 150 },
  { id: 42, name: "Adventure Seeker", description: "Jelajahi 10 habit baru berbeda", icon: <Compass className="h-6 w-6" />, color: "text-blue-600", unlocked: false, points: 170 },
  { id: 43, name: "Master of All", description: "Buka semua achievement", icon: <Crown className="h-6 w-6" />, color: "text-gold-500", unlocked: false, points: 2000 },
  { id: 44, name: "Legend Status", description: "Capai level tertinggi", icon: <Award className="h-6 w-6" />, color: "text-yellow-500", unlocked: false, points: 1500 },
  { id: 45, name: "Forever Champion", description: "Maintain streak 1 tahun penuh", icon: <Trophy className="h-6 w-6" />, color: "text-gold-400", unlocked: false, points: 3000 },
];

const REWARDS = [
  { id: 1, name: "Custom Theme", points: 500, icon: "🎨", description: "Ubah tema aplikasi" },
  { id: 2, name: "Extra Break Time", points: 250, icon: "☕", description: "+10 menit break time" },
  { id: 3, name: "Motivation Quote", points: 150, icon: "💭", description: "Quote inspiratif harian" },
  { id: 4, name: "Premium Features", points: 1000, icon: "✨", description: "Akses fitur premium" },
  { id: 5, name: "Custom Goal", points: 300, icon: "🎯", description: "Buat goal custom" },
  { id: 6, name: "Weekly Report", points: 200, icon: "📊", description: "Laporan mingguan detail" },
];

export default function RewardsPage() {
  const [points, setPoints] = useState(1250);
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([1]);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [unlockedAchievements, setUnlockedAchievements] = useState<number[]>([1, 2, 4, 7, 13, 15, 17, 30, 36]);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [bonusPointsAvailable, setBonusPointsAvailable] = useState<number[]>([1, 2, 4, 7, 13, 15, 17, 30, 36]);

  const handleRedeemReward = (rewardId: number, rewardPoints: number) => {
    if (points >= rewardPoints && !redeemedRewards.includes(rewardId)) {
      setPoints(points - rewardPoints);
      setRedeemedRewards([...redeemedRewards, rewardId]);
    }
  };

  const handleClaimAchievementBonus = (achievementId: number) => {
    if (bonusPointsAvailable.includes(achievementId)) {
      const achievement = achievements.find(a => a.id === achievementId);
      if (achievement) {
        setPoints(points + achievement.points);
        setBonusPointsAvailable(bonusPointsAvailable.filter(id => id !== achievementId));
      }
    }
  };

  const nextLevel = 2000;
  const progressPercent = (points / nextLevel) * 100;
  const totalUnlockedPoints = achievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-8">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Poin</p>
                <p className="text-4xl font-bold text-accent">{points}</p>
              </div>
              <Zap className="h-12 w-12 text-accent/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Progres Level</p>
              <Progress value={progressPercent} className="mb-2" />
              <p className="text-xs text-muted-foreground">{points} / {nextLevel}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/30 border-white/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Achievement</p>
              <p className="text-3xl font-bold">{unlockedAchievements.length}/{achievements.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Badges Diraih</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Bonus Poin</p>
                <p className="text-3xl font-bold text-green-400">+{totalUnlockedPoints}</p>
              </div>
              <Gift className="h-12 w-12 text-green-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Pencapaian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, idx) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            const hasBonus = bonusPointsAvailable.includes(achievement.id);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`backdrop-blur-sm transition-all cursor-pointer hover:border-white/20 ${isUnlocked ? "bg-card/40 border-white/10" : "bg-card/20 border-white/5 opacity-60"}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl ${isUnlocked ? "bg-white/10" : "bg-white/5"}`}>
                        <div className={achievement.color}>
                          {achievement.icon}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {isUnlocked && (
                          <Badge className="bg-accent/20 text-accent border-accent/30">
                            ✓ Diraih
                          </Badge>
                        )}
                        {isUnlocked && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            +{achievement.points} Poin
                          </Badge>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    
                    {hasBonus && (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="mt-3"
                      >
                        <Button
                          onClick={() => handleClaimAchievementBonus(achievement.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm"
                        >
                          <Gift className="h-3 w-3 mr-1" /> Klaim +{achievement.points}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <DetailAchievementModal open={isDetailOpen} onOpenChange={setIsDetailOpen} achievement={selectedAchievement} />
      </div>

      {/* Rewards Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-pink-500" />
          Reward Store
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REWARDS.map((reward, idx) => {
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canRedeem = points >= reward.points && !isRedeemed;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-card/30 border-white/5 backdrop-blur-sm hover:border-white/10 transition-all">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{reward.icon}</div>
                    <h3 className="font-semibold mb-1">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-sm">{reward.points}</span>
                      </div>
                      {isRedeemed && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          ✓ Ditukar
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => handleRedeemReward(reward.id, reward.points)}
                      disabled={!canRedeem}
                      className={`w-full ${canRedeem ? "bg-accent hover:bg-accent/90 text-white" : "bg-white/5 text-muted-foreground"}`}
                    >
                      {isRedeemed ? "Sudah Ditukar" : canRedeem ? "Tukar" : "Poin Kurang"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">💡 Cara Dapatkan Poin</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Selesaikan 1 habit = +10 poin</li>
            <li>• Dapatkan achievement = +50-200 poin</li>
            <li>• Streak 7 hari = +100 poin</li>
            <li>• Berbagi di komunitas = +25 poin</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
