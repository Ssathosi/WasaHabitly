import { LandingHero } from "@/components/LandingHero";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const features = [
  {
    icon: <CheckCircle2 className="h-6 w-6 text-accent" />,
    title: "Pelacakan Intuitif",
    description: "Catat kebiasaan harianmu dengan sekali klik. Antarmuka yang bersih dan responsif.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
    title: "Analitik Mendalam",
    description: "Visualisasikan progresmu dengan grafik heatmap dan statistik detail.",
  },
  {
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    title: "Mode Fokus",
    description: "Timer Pomodoro terintegrasi untuk membantumu tetap fokus pada tugas.",
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: "Komunitas",
    description: "Bagikan pencapaianmu dan saling memotivasi dengan teman-teman.",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center text-white text-sm sm:text-base">W</div>
            <span className="hidden xs:inline">WasaHabitly</span>
            <span className="inline xs:hidden"><span className="text-accent">Wasa</span>Habitly</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Fitur</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Landing page 2</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Landing Page 3</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" className="text-xs sm:text-sm px-3 sm:px-4 rounded h-8 sm:h-10" onClick={() => setLocation("/login")}>Masuk</Button>
            <Button onClick={() => setLocation("/login")} className="bg-accent hover:bg-accent/90 text-white rounded text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10">Daftar</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <LandingHero />

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-20 md:py-24 relative bg-black/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Fitur Yang Membantumu Bertumbuh</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                Semua alat yang kamu butuhkan untuk membangun kebiasaan baik dan menghilangkan yang buruk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-6 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 sm:mb-4 border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 border-t border-white/5 bg-background">
          <div className="container mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2025 WasaHabitly. Dibuat oleh <span className="text-white">Wasasi Org's</span> </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
