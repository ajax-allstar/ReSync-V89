import { motion } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';
import type { ThemeMode } from '../types/theme';

const themes: Array<{
  id: ThemeMode;
  label: string;
  swatch: string;
}> = [
  {
    id: 'default',
    label: 'Default',
    swatch: 'linear-gradient(135deg, #f9f2e7 0%, #c7ddff 100%)',
  },
  {
    id: 'dark',
    label: 'Dark',
    swatch: 'linear-gradient(135deg, #0d1321 0%, #21324a 100%)',
  },
  {
    id: 'ocean',
    label: 'Ocean',
    swatch: 'linear-gradient(135deg, #0f4c5c 0%, #3ab7bf 100%)',
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="glass-panel flex items-center gap-1 rounded-full p-1.5"
      role="group"
      aria-label="Select theme"
    >
      {themes.map((option) => {
        const active = option.id === theme;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setTheme(option.id)}
            aria-pressed={active}
            className="relative rounded-full px-2.5 py-2 text-left text-xs font-semibold text-[var(--text-secondary)] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-3.5"
          >
            {active ? (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full border border-white/20 bg-white/[0.12] shadow-[0_6px_24px_rgba(15,23,42,0.12)]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            ) : null}
            <span className="relative flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-5 w-5 rounded-full border border-white/35"
                style={{ background: option.swatch }}
              />
              <span className={active ? 'text-[var(--text-primary)]' : ''}>{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
