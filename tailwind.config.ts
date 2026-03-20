import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.18)',
        glow: '0 0 40px rgba(93, 149, 255, 0.22)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.38), transparent 34%), radial-gradient(circle at 80% 15%, rgba(135,193,255,0.22), transparent 30%), radial-gradient(circle at 50% 100%, rgba(102,211,179,0.18), transparent 34%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

