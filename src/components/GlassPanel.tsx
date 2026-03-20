import type { HTMLAttributes, PropsWithChildren } from 'react';

type GlassPanelProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    glow?: boolean;
  }
>;

export function GlassPanel({
  children,
  className = '',
  glow = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={`glass-panel ${glow ? 'glass-panel-glow' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

