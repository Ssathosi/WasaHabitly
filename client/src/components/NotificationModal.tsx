import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Info, Trophy, Flame, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onMarkAsRead?: (id: number) => void;
  onMarkAllAsRead?: () => void;
  unreadCount: number;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "achievement",
    title: "🏆 Achievement Unlocked!",
    message: "Selamat! Kamu telah mencapai 7 hari streak. Lanjutkan semangat ini!",
    timestamp: "5 menit yang lalu",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "✓ Habit Selesai",
    message: "Kamu telah menyelesaikan habit 'Olahraga Pagi' hari ini.",
    timestamp: "1 jam yang lalu",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "💡 Reminder",
    message: "Jangan lupa menyelesaikan habit 'Membaca Buku' hari ini!",
    timestamp: "3 jam yang lalu",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "✓ Weekly Goal",
    message: "Kamu telah mencapai 65% target mingguan. Penuh semangat!",
    timestamp: "1 hari yang lalu",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "📊 Analytics",
    message: "Laporan mingguan Anda sudah siap. Lihat insight terbaru di Analytics.",
    timestamp: "2 hari yang lalu",
    read: true,
  },
];

function getIcon(type: string) {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-400" />;
    case "warning":
      return <AlertCircle className="h-5 w-5 text-yellow-400" />;
    case "achievement":
      return <Trophy className="h-5 w-5 text-accent" />;
    default:
      return <Info className="h-5 w-5 text-blue-400" />;
  }
}

function getBackground(type: string, read: boolean) {
  if (read) return "bg-white/5 border-white/10";
  
  switch (type) {
    case "success":
      return "bg-green-500/10 border-green-500/20";
    case "warning":
      return "bg-yellow-500/10 border-yellow-500/20";
    case "achievement":
      return "bg-accent/10 border-accent/20";
    default:
      return "bg-blue-500/10 border-blue-500/20";
  }
}

export function NotificationModal({
  open,
  onOpenChange,
  notifications = MOCK_NOTIFICATIONS,
  onMarkAsRead,
  onMarkAllAsRead,
  unreadCount,
}: NotificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/50 border-white/10 backdrop-blur-md max-w-md max-h-[600px] flex flex-col">
        <DialogHeader className="pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              <DialogTitle>Notifikasi</DialogTitle>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-accent/20 text-accent border-accent/30">
                {unreadCount} Baru
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-2 pr-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto opacity-20 mb-2" />
              <p className="text-sm">Tidak ada notifikasi</p>
            </div>
          ) : (
            notifications.map((notif, idx) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className={`border transition-all cursor-pointer hover:border-white/20 ${getBackground(
                    notif.type,
                    notif.read
                  )}`}
                  onClick={() => onMarkAsRead?.(notif.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`text-sm font-semibold ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          {notif.timestamp}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {unreadCount > 0 && (
          <div className="border-t border-white/10 pt-4 mt-4">
            <Button
              onClick={onMarkAllAsRead}
              className="w-full text-sm bg-white/5 hover:bg-white/10 border border-white/10"
            >
              Tandai Semua Sudah Dibaca
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
