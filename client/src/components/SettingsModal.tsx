import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Bell, Globe, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("id");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-card/50 to-card/30 border-white/10 backdrop-blur-xl shadow-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold bg-gradient-to-r from-accent to-teal-400 bg-clip-text text-transparent">
            ⚙️ Pengaturan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tampilan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-sm">Tampilan</h3>
            </div>
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
                  Mode Gelap
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Bahasa & Lokalisasi */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-sm">Bahasa</h3>
            </div>
            <div className="space-y-3 ml-6">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/5 border-white/10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Notifikasi */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-sm">Notifikasi</h3>
            </div>
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="text-sm cursor-pointer">
                  Push Notifikasi
                </Label>
                <Switch
                  id="push-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="text-sm cursor-pointer">
                  Email Notifikasi
                </Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-white/5" />

          {/* Akun */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Akun</h3>
            <div className="space-y-2 ml-6 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span> wasasi@example.com
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Nama:</span> Walid Sathosi Sirait
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 pt-4 border-t border-white/5">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Tutup
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
