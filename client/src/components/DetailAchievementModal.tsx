import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface DetailAchievementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievement: {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    unlocked: boolean;
  } | null;
}

export function DetailAchievementModal({ open, onOpenChange, achievement }: DetailAchievementModalProps) {
  if (!achievement) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Detail Pencapaian</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl bg-white/10 ${achievement.color}`}>
              <div className="text-4xl">{achievement.icon}</div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">{achievement.name}</h2>
              {achievement.unlocked && (
                <Badge className="bg-accent/20 text-accent border-accent/30">✓ Diraih</Badge>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Deskripsi</h3>
            <p className="text-muted-foreground">{achievement.description}</p>
          </div>

          {achievement.unlocked && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-accent">🎉 Kamu sudah membuka achievement ini!</p>
            </div>
          )}

          {!achievement.unlocked && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Terus berusaha untuk membuka achievement ini!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
