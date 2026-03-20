import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

function canUseCustomCursor() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(pointer: fine)').matches;
}

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 560, damping: 42, mass: 0.25 });
  const y = useSpring(pointerY, { stiffness: 560, damping: 42, mass: 0.25 });

  useEffect(() => {
    setEnabled(!reducedMotion && canUseCustomCursor());
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const onPointerMove = (event: PointerEvent) => {
      setVisible(true);
      pointerX.set(event.clientX - 9);
      pointerY.set(event.clientY - 9);
    };

    const onPointerLeave = () => setVisible(false);

    const onHoverChange = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]'),
      );
      setInteractive(isInteractive);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseover', onHoverChange);
    document.addEventListener('focusin', onHoverChange);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseover', onHoverChange);
      document.removeEventListener('focusin', onHoverChange);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full border border-white/40 bg-[var(--cursor-fill)] backdrop-blur-xl md:flex"
      style={{
        x,
        y,
        width: interactive ? 38 : 18,
        height: interactive ? 38 : 18,
        opacity: visible ? 1 : 0,
        boxShadow: interactive
          ? '0 0 40px var(--cursor-glow), inset 0 0 18px rgba(255,255,255,0.22)'
          : '0 0 24px var(--cursor-glow)',
      }}
      animate={{
        scale: interactive ? 1.15 : 1,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <span className="h-2 w-2 rounded-full bg-white/80" />
    </motion.div>
  );
}
