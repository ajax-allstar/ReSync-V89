import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';
import type { ThemeMode } from '../types/theme';

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
  alpha: number;
  color: string;
  depth: number;
};

const themePalettes: Record<ThemeMode, string[]> = {
  default: ['rgba(54, 92, 197, 0.18)', 'rgba(77, 152, 208, 0.22)', 'rgba(70, 158, 146, 0.18)'],
  dark: ['rgba(133, 175, 255, 0.22)', 'rgba(94, 226, 217, 0.18)', 'rgba(202, 219, 255, 0.16)'],
  ocean: ['rgba(40, 155, 171, 0.2)', 'rgba(104, 211, 216, 0.22)', 'rgba(181, 240, 230, 0.17)'],
};

function particleGap(width: number) {
  if (width < 640) {
    return 42;
  }

  if (width < 1024) {
    return 34;
  }

  return 30;
}

function createParticles(width: number, height: number, theme: ThemeMode) {
  const gap = particleGap(width);
  const palette = themePalettes[theme];
  const particles: Particle[] = [];

  for (let x = gap * 0.5; x < width; x += gap) {
    for (let y = gap * 0.5; y < height; y += gap) {
      const depth = 0.7 + Math.random() * 0.8;

      particles.push({
        ox: x,
        oy: y,
        x,
        y,
        vx: 0,
        vy: 0,
        phase: Math.random() * Math.PI * 2,
        size: width < 640 ? 1 + Math.random() * 1.6 : 1.2 + Math.random() * 2.2,
        alpha: 0.14 + Math.random() * 0.28,
        color: palette[particles.length % palette.length],
        depth,
      });
    }
  }

  return particles;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({
    x: typeof window === 'undefined' ? 0 : window.innerWidth * 0.5,
    y: typeof window === 'undefined' ? 0 : window.innerHeight * 0.5,
    tx: typeof window === 'undefined' ? 0 : window.innerWidth * 0.5,
    ty: typeof window === 'undefined' ? 0 : window.innerHeight * 0.5,
    vx: 0,
    vy: 0,
    speed: 0,
    active: false,
  });
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(width, height, theme);
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);

      pointerRef.current.vx += (pointerRef.current.tx - pointerRef.current.x) * 0.16;
      pointerRef.current.vy += (pointerRef.current.ty - pointerRef.current.y) * 0.16;
      pointerRef.current.vx *= 0.68;
      pointerRef.current.vy *= 0.68;
      pointerRef.current.x += pointerRef.current.vx;
      pointerRef.current.y += pointerRef.current.vy;
      pointerRef.current.speed = Math.hypot(pointerRef.current.vx, pointerRef.current.vy);

      particlesRef.current.forEach((particle) => {
        if (!reducedMotion) {
          particle.phase += 0.0045 * particle.depth;

          if (pointerRef.current.active) {
            const dx = particle.x - pointerRef.current.x;
            const dy = particle.y - pointerRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const radius = width < 768 ? 120 : 170;

            if (distance < radius) {
              const influence = (radius - distance) / radius;
              const swirl = (0.018 + pointerRef.current.speed * 0.0024) * particle.depth;
              const push = 0.55 + pointerRef.current.speed * 0.018;
              particle.vx += (dx / distance) * influence * push + -dy * swirl * influence;
              particle.vy += (dy / distance) * influence * push + dx * swirl * influence;
            }
          }

          particle.vx +=
            (particle.ox - particle.x) * 0.036 +
            Math.cos(time * 0.0012 + particle.phase) * 0.032 * particle.depth;
          particle.vy +=
            (particle.oy - particle.y) * 0.036 +
            Math.sin(time * 0.001 + particle.phase * 1.2) * 0.032 * particle.depth;
          particle.vx *= 0.9;
          particle.vy *= 0.9;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        context.save();
        const dx = particle.x - pointerRef.current.x;
        const dy = particle.y - pointerRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const radius = width < 768 ? 120 : 170;
        const influence = pointerRef.current.active ? Math.max(0, 1 - distance / radius) : 0;

        context.globalAlpha = particle.alpha + influence * 0.16;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 12 + influence * 16;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size + influence * 1.6, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.tx = event.clientX;
      pointerRef.current.ty = event.clientY;
      pointerRef.current.active = true;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    resize();

    if (reducedMotion) {
      render(0);
    } else {
      animationFrame = window.requestAnimationFrame(render);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('blur', onPointerLeave);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [reducedMotion, theme]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-90" />;
}
