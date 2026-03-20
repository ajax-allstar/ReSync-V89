import { motion } from 'framer-motion';

type LogoProps = {
  showWordmark?: boolean;
};

export function Logo({ showWordmark = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        aria-hidden="true"
        className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] border border-white/30 bg-white/10 shadow-glass backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.86, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[1px] rounded-[17px] bg-[linear-gradient(145deg,rgba(255,255,255,0.48),rgba(255,255,255,0.08))]" />
        <div className="absolute -right-3 top-1 h-8 w-8 rounded-full bg-[var(--accent-glow)] blur-xl" />
        <span className="relative font-display text-xl font-bold tracking-[0.14em] text-[var(--text-primary)]">
          R
        </span>
      </motion.div>
      {showWordmark ? (
        <div className="flex flex-col">
          <span className="font-display text-2xl font-semibold tracking-[0.08em] text-[var(--text-primary)]">
            ReSync
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--text-muted)]">
            Student Rhythm
          </span>
        </div>
      ) : null}
    </div>
  );
}

