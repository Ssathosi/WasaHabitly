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
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center text-white">W</div>
            WasaHabitly
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Fitur</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimoni</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Harga</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:flex" onClick={() => setLocation("/login")}>Masuk</Button>
            <Button onClick={() => setLocation("/dashboard")} className="bg-white/10 hover:bg-white/20 text-white border border-white/10">Daftar</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <LandingHero />

        {/* Features Section */}
        <section id="features" className="py-24 relative bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Yang Membantumu Bertumbuh</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Semua alat yang kamu butuhkan untuk membangun kebiasaan baik dan menghilangkan yang buruk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-background">
          <div className="container mx-auto px-6 text-center text-muted-foreground">
            <p>&copy; 2025 WasaHabitly. Dibuat dengan ❤️ di Indonesia.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
