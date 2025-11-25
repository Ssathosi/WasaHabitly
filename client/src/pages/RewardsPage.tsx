import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DetailAchievementModal } from "@/components/DetailAchievementModal";
import { Trophy, Zap, Star, Heart, Flame, Award, Gift } from "lucide-react";
import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  { id: 1, name: "First Step", description: "Selesaikan 1 hari pertama", icon: <Trophy className="h-6 w-6" />, color: "text-yellow-400", unlocked: true },
  { id: 2, name: "Week Warrior", description: "Mencapai 7 hari streak", icon: <Flame className="h-6 w-6" />, color: "text-orange-400", unlocked: true },
  { id: 3, name: "Habit Master", description: "Mencapai 30 hari streak", icon: <Crown className="h-6 w-6" />, color: "text-purple-400", unlocked: false },
  { id: 4, name: "Perfect Week", description: "Selesaikan semua habit dalam 1 minggu", icon: <Star className="h-6 w-6" />, color: "text-blue-400", unlocked: true },
  { id: 5, name: "Social Butterfly", description: "Berinteraksi dengan 5 teman", icon: <Heart className="h-6 w-6" />, color: "text-pink-400", unlocked: false },
  { id: 6, name: "Consistent Legend", description: "Mencapai 100 hari streak", icon: <Award className="h-6 w-6" />, color: "text-red-400", unlocked: false },
];

const REWARDS = [
  { id: 1, name: "Custom Theme", points: 500, icon: "🎨", description: "Ubah tema aplikasi" },
  { id: 2, name: "Extra Break Time", points: 250, icon: "☕", description: "+10 menit break time" },
  { id: 3, name: "Motivation Quote", points: 150, icon: "💭", description: "Quote inspiratif harian" },
  { id: 4, name: "Premium Features", points: 1000, icon: "✨", description: "Akses fitur premium" },
  { id: 5, name: "Custom Goal", points: 300, icon: "🎯", description: "Buat goal custom" },
  { id: 6, name: "Weekly Report", points: 200, icon: "📊", description: "Laporan mingguan detail" },
];

function Crown({ className }: { className?: string }) {
  return <Award className={className} />;
}

export default function RewardsPage() {
  const [points, setPoints] = useState(1250);
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([1]);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleRedeemReward = (rewardId: number, rewardPoints: number) => {
    if (points >= rewardPoints && !redeemedRewards.includes(rewardId)) {
      setPoints(points - rewardPoints);
      setRedeemedRewards([...redeemedRewards, rewardId]);
    }
  };

  const nextLevel = 2000;
  const progressPercent = (points / nextLevel) * 100;

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
              <p className="text-3xl font-bold">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Badges Diraih</p>
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
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                setSelectedAchievement(achievement);
                setIsDetailOpen(true);
              }}
            >
              <Card className={`backdrop-blur-sm transition-all cursor-pointer hover:border-white/20 ${achievement.unlocked ? "bg-card/40 border-white/10" : "bg-card/20 border-white/5 opacity-60"}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${achievement.unlocked ? "bg-white/10" : "bg-white/5"}`}>
                      <div className={achievement.color}>
                        {achievement.icon}
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        ✓ Diraih
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
