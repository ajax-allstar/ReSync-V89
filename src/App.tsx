import { motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';

function Atmosphere() {
  const orbTransition = {
    duration: 12,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-[var(--accent-glow)] blur-[120px] sm:h-80 sm:w-80"
        animate={{ x: [0, 40, -10], y: [0, -20, 16] }}
        transition={orbTransition}
      />
      <motion.div
        className="absolute right-[-4rem] top-16 h-64 w-64 rounded-full bg-[var(--secondary-glow)] blur-[120px] sm:h-96 sm:w-96"
        animate={{ x: [0, -34, 12], y: [0, 22, -18] }}
        transition={{ ...orbTransition, duration: 16 }}
      />
      <motion.div
        className="absolute bottom-[-5rem] left-1/3 h-72 w-72 rounded-full bg-white/[0.18] blur-[140px]"
        animate={{ x: [0, 24, -18], y: [0, -28, 10] }}
        transition={{ ...orbTransition, duration: 18 }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CustomCursor />
      <ParticleBackground />
      <Atmosphere />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-8 sm:px-6 lg:px-8">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
