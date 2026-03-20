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
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
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
      className="pointer-events-none fixed left-0 top-0 z-50 hidden items-center justify-center rounded-full border border-[var(--cursor-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.34),var(--cursor-fill))] backdrop-blur-xl md:flex"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: interactive ? 28 : 20,
        height: interactive ? 28 : 20,
        opacity: visible ? 1 : 0,
        boxShadow: interactive
          ? '0 12px 30px rgba(8, 15, 28, 0.2), 0 0 36px var(--cursor-glow), inset 0 1px 0 rgba(255,255,255,0.4)'
          : '0 10px 24px rgba(8, 15, 28, 0.18), 0 0 22px var(--cursor-glow), inset 0 1px 0 rgba(255,255,255,0.34)',
      }}
      animate={{
        scale: interactive ? 1.08 : 1,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <span
        className="h-[42%] w-[42%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.24) 50%, transparent 72%)',
          boxShadow: '0 0 12px rgba(255,255,255,0.18)',
        }}
      />
    </motion.div>
  );
}
