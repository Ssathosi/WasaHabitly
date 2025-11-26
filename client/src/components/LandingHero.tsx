import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Float, Environment, Stars } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";
import { useLocation } from "wouter";

function Shape({ position, color, type, speed = 1 }: { position: [number, number, number], color: string, type: "icosahedron" | "torus" | "octahedron" | "sphere", speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2 * speed;
    meshRef.current.rotation.y += delta * 0.3 * speed;
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        {type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {type === "torus" && <torusGeometry args={[0.7, 0.3, 16, 32]} />}
        {type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {type === "sphere" && <sphereGeometry args={[0.8, 32, 32]} />}
        
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

export function LandingHero() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#1ABC9C" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2C3E50" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <Shape position={[-3, 2, -5]} color="#1ABC9C" type="icosahedron" speed={0.8} />
          <Shape position={[4, -1, -3]} color="#34495E" type="torus" speed={1.2} />
          <Shape position={[-4, -3, -6]} color="#2C3E50" type="octahedron" speed={0.5} />
          <Shape position={[3, 3, -8]} color="#16A085" type="sphere" speed={0.9} />

          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-medium backdrop-blur-sm">
            🚀 Versi Beta 2.0 Kini Tersedia
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
            Bangun Kebiasaan <br />
            <span className="text-accent">Terbaikmu</span> Hari Ini
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
            WasaHabitly membantu Anda melacak progres, membangun disiplin, dan mencapai tujuan hidup dengan analitik mendalam dan antarmuka yang indah.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button 
              size="sm"
              className="text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-6 rounded-full bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_-5px_rgba(26,188,156,0.5)] transition-all hover:scale-105 cursor-pointer"
              onClick={() => setLocation("/dashboard")}
            >
              Mulai Sekarang <ArrowRight className="ml-2 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-6 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-foreground backdrop-blur-sm cursor-pointer"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Gradient Overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
    </div>
  );
}
