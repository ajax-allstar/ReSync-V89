import { motion } from 'framer-motion';

type SignInButtonProps = {
  href?: string;
  className?: string;
  children?: string;
};

export function SignInButton({
  href = '#signin',
  className = '',
  children = 'Sign In',
}: SignInButtonProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] px-5 py-3 text-sm font-semibold text-white shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`.trim()}
    >
      <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.3),transparent_40%,transparent_60%,rgba(255,255,255,0.16))] opacity-70 transition-transform duration-500 group-hover:translate-x-3" />
      <span className="relative flex items-center gap-2">
        {children}
        <span
          aria-hidden="true"
          className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:scale-125"
        />
      </span>
    </motion.a>
  );
}

