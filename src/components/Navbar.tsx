import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { SignInButton } from './SignInButton';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {
  return (
    <motion.header
      className="relative z-20 pt-4"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="glass-panel flex flex-col gap-4 rounded-[28px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a
          href="#top"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <Logo />
        </a>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ThemeSwitcher />
          <SignInButton className="w-full sm:w-auto" />
        </div>
      </nav>
    </motion.header>
  );
}

