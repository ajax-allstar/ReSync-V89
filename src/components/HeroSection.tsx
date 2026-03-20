import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { SignInButton } from './SignInButton';

const pillars = [
  'Focused study sessions',
  'Clear academic planning',
  'Motivation with breathing room',
];

const quickSignals = [
  { label: 'Focus rhythm', value: '84%' },
  { label: 'Weekly structure', value: 'Balanced' },
  { label: 'Mindset reset', value: 'Calm' },
];

const microCards = [
  {
    title: 'Study Flow',
    description: 'Design deeper work blocks without draining your day.',
    tag: '∑ Smart pacing',
  },
  {
    title: 'Academic Clarity',
    description: 'See subjects, deadlines, and energy together in one place.',
    tag: 'π Clear priorities',
  },
  {
    title: 'Healthy Momentum',
    description: 'Track progress with balance, not pressure.',
    tag: 'λ Sustainable growth',
  },
];

export function HeroSection() {
  return (
    <main className="relative z-10 flex flex-1 items-center py-10 sm:py-14">
      <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="pointer-events-none absolute -left-8 top-8 h-40 w-40 rounded-full bg-[var(--accent-glow)] blur-3xl sm:h-56 sm:w-56" />
          <GlassPanel glow className="relative overflow-hidden rounded-[34px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="absolute inset-0 bg-mesh opacity-60" />
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
            <div className="relative">
              <motion.p
                className="mb-4 inline-flex items-center rounded-full border border-white/35 bg-white/[0.12] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--text-secondary)]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                ReSync for students
              </motion.p>
              <motion.h1
                className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                Find a calmer, sharper rhythm for studying, planning, and growing with{' '}
                <span className="text-[var(--accent-strong)]">ReSync</span>.
              </motion.h1>
              <motion.p
                className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
              >
                ReSync helps students stay focused, organize academic life, protect mental clarity,
                and move forward with balanced progress instead of burnout.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
              >
                <motion.a
                  href="#start"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Get Started
                </motion.a>
                <SignInButton className="px-6 py-3.5" />
              </motion.div>

              <motion.div
                className="mt-8 grid gap-3 sm:grid-cols-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
              >
                {quickSignals.map((signal) => (
                  <GlassPanel
                    key={signal.label}
                    className="rounded-[24px] px-4 py-4 text-center sm:text-left"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      {signal.label}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                      {signal.value}
                    </div>
                  </GlassPanel>
                ))}
              </motion.div>

              <motion.ul
                className="mt-8 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {pillars.map((pillar) => (
                  <li
                    key={pillar}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-3 text-center font-medium backdrop-blur-xl"
                  >
                    {pillar}
                  </li>
                ))}
              </motion.ul>
            </div>
          </GlassPanel>
        </motion.section>

        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        >
          <div className="pointer-events-none absolute left-8 top-12 h-32 w-32 rounded-full bg-[var(--secondary-glow)] blur-3xl" />
          <GlassPanel className="relative overflow-hidden rounded-[34px] p-5 sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_48%)]" />
            <div className="relative space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-[28px] border border-white/25 bg-white/10 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                    Today&apos;s academic rhythm
                  </p>
                  <h2 className="mt-3 font-display text-2xl text-[var(--text-primary)]">
                    Plan intentionally. Focus deeply. Recover lightly.
                  </h2>
                </div>
                <div className="rounded-full border border-white/30 bg-white/[0.12] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
                  E=mc²
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <GlassPanel className="rounded-[28px] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Focus arc</span>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)]">
                      3 sessions
                    </span>
                  </div>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[0.15]">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ delay: 0.8, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    A study rhythm that protects concentration while still leaving room to reset.
                  </p>
                </GlassPanel>

                <GlassPanel className="rounded-[28px] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--text-muted)]">
                    Weekly calibration
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {['Mon', 'Wed', 'Fri'].map((day) => (
                      <div
                        key={day}
                        className="rounded-2xl border border-white/25 bg-white/10 px-3 py-4 text-center"
                      >
                        <div className="text-xs text-[var(--text-muted)]">{day}</div>
                        <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                          √ Focus
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              </div>

              <div className="grid gap-4">
                {microCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.72 + index * 0.08 }}
                  >
                    <GlassPanel className="rounded-[26px] p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-lg font-semibold text-[var(--text-primary)]">
                            {card.title}
                          </div>
                          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                            {card.description}
                          </p>
                        </div>
                        <div className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                          {card.tag}
                        </div>
                      </div>
                    </GlassPanel>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </motion.section>
      </div>
    </main>
  );
}
