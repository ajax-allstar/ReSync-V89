import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../providers/ThemeProvider';
import type { ThemeMode } from '../types/theme';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
  alpha: number;
  symbol: string;
  color: string;
  depth: number;
};

const SYMBOLS = [
  '+',
  '−',
  '×',
  '÷',
  '∑',
  '∫',
  'π',
  '√',
  '≈',
  'A',
  'B',
  'C',
  'X',
  'Y',
  'Z',
  'H2O',
  'Na',
  'Cl',
  'CO2',
  'O2',
  'F',
  'v',
  'a',
  'E=mc²',
  'λ',
  'Ω',
  '∆',
  '°',
  'µ',
];

const themePalettes: Record<ThemeMode, string[]> = {
  default: ['rgba(54, 92, 197, 0.28)', 'rgba(77, 152, 208, 0.24)', 'rgba(70, 158, 146, 0.22)'],
  dark: ['rgba(133, 175, 255, 0.28)', 'rgba(94, 226, 217, 0.22)', 'rgba(202, 219, 255, 0.18)'],
  ocean: ['rgba(40, 155, 171, 0.28)', 'rgba(104, 211, 216, 0.25)', 'rgba(181, 240, 230, 0.18)'],
};

function particleCount(width: number) {
  if (width < 640) {
    return 22;
  }

  if (width < 1024) {
    return 34;
  }

  return 50;
}

function createParticles(width: number, height: number, theme: ThemeMode) {
  const total = particleCount(width);
  const palette = themePalettes[theme];

  return Array.from({ length: total }, (_, index): Particle => {
    const depth = 0.55 + Math.random() * 0.9;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.5) * 0.18 * depth,
      phase: Math.random() * Math.PI * 2,
      size: width < 640 ? 12 + Math.random() * 9 : 14 + Math.random() * 12,
      alpha: 0.45 + Math.random() * 0.35,
      symbol: SYMBOLS[index % SYMBOLS.length],
      color: palette[index % palette.length],
      depth,
    };
  });
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
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

      particlesRef.current.forEach((particle) => {
        if (!reducedMotion) {
          particle.phase += 0.004 * particle.depth;
          particle.x += particle.vx + Math.cos(time * 0.00022 + particle.phase) * 0.08 * particle.depth;
          particle.y += particle.vy + Math.sin(time * 0.00018 + particle.phase) * 0.08 * particle.depth;

          if (mouseRef.current.active) {
            const dx = particle.x - mouseRef.current.x;
            const dy = particle.y - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = width < 768 ? 120 : 180;

            if (distance < radius && distance > 0.001) {
              const influence = (radius - distance) / radius;
              particle.x += (dx / distance) * influence * 1.8 * particle.depth;
              particle.y += (dy / distance) * influence * 1.8 * particle.depth;
            }
          }

          if (particle.x < -80) particle.x = width + 40;
          if (particle.x > width + 80) particle.x = -40;
          if (particle.y < -80) particle.y = height + 40;
          if (particle.y > height + 80) particle.y = -40;
        }

        context.save();
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.font = `${Math.round(480 + particle.depth * 160)} ${particle.size}px "Manrope", sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(particle.symbol, particle.x, particle.y);
        context.restore();
      });

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    resize();

    if (reducedMotion) {
      render(0);
    } else {
      animationFrame = window.requestAnimationFrame(render);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('blur', onPointerLeave);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [reducedMotion, theme]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-90" />;
}
