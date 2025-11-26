import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Chrome, Facebook, Apple, Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailAuth = () => {
    if (email && password && (!isSignup || name)) {
      setLocation("/dashboard");
    }
  };

  const handleSocialAuth = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">WasaHabitly</h1>
          <p className="text-muted-foreground">
            {isSignup ? "Buat akun dan mulai bangun kebiasaan terbaikmu" : "Masuk untuk melanjutkan perjalanan habitmu"}
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-card/50 border-white/10 backdrop-blur-md shadow-2xl mb-6 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Social Auth Buttons */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground text-center mb-4">
                {isSignup ? "Daftar dengan" : "Masuk dengan"}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSocialAuth}
                  className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-medium group"
                >
                  <Chrome className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSocialAuth}
                  className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-medium group"
                >
                  <Facebook className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSocialAuth}
                  className="p-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Apple className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card/50 backdrop-blur text-muted-foreground">Atau</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              {isSignup && (
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-muted-foreground mb-2 block">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkapmu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 focus-visible:ring-accent"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()}
                    className="pl-10 bg-white/5 border-white/10 focus-visible:ring-accent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmailAuth}
              disabled={!email || !password || (isSignup && !name)}
              className="w-full py-3 rounded bg-gradient-to-r from-accent to-teal-500 hover:from-accent/90 hover:to-teal-600 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-accent/20"
            >
              {isSignup ? "Buat Akun" : "Masuk"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Toggle Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isSignup ? "Sudah punya akun? " : "Belum punya akun? "}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  {isSignup ? "Masuk di sini" : "Daftar di sini"}
                </button>
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Dengan {isSignup ? "mendaftar" : "masuk"}, Anda menyetujui{" "}
            <button className="text-accent hover:text-accent/80 transition-colors">
              Syarat & Ketentuan
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            Baca{" "}
            <button className="text-accent hover:text-accent/80 transition-colors">
              Kebijakan Privasi
            </button>
            {" "}kami
          </p>
        </div>
      </motion.div>
    </div>
  );
}
