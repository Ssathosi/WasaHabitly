import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Bell, Globe, Moon, Lock, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      <DialogContent className="bg-gradient-to-br from-card/50 to-card/30 border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-teal-400 bg-clip-text text-transparent">
            ⚙️ Pengaturan
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-2">Kelola preferensi dan akun Anda</p>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Grid Settings - Appearance & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tampilan */}
            <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Moon className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-3">Tampilan</h3>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="text-xs cursor-pointer text-muted-foreground">
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
            </Card>

            {/* Bahasa */}
            <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Globe className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-3">Bahasa</h3>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-xs h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Notifikasi Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Bell className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-semibold text-sm">Notifikasi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
              <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-xs cursor-pointer text-muted-foreground">
                    Push Notifikasi
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
              </Card>
              <Card className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-xs cursor-pointer text-muted-foreground">
                    Email Notifikasi
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Akun Section */}
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Lock className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Akun</h3>
                <p className="text-xs text-muted-foreground">Informasi akun Anda</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-10">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">wasasi@example.com</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <p className="text-xs text-muted-foreground">Nama</p>
                <p className="text-sm font-medium text-foreground">Walid Sathosi Sirait</p>
              </div>
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Database className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-2">Data</h3>
                <p className="text-xs text-muted-foreground mb-4">Kelola data dan privasi Anda</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 hover:bg-white/5"
                  >
                    Export Data
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 hover:bg-white/5"
                  >
                    Clear Cache
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter className="gap-2 pt-4 border-t border-white/5">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-white/5"
            data-testid="button-settings-close"
          >
            Tutup
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30"
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
