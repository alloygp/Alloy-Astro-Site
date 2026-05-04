// src/components/Eyebrow.tsx
// Small uppercase label with optional accent rule. Ports components.jsx Eyebrow.
import type { ReactNode } from 'react';

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
  noLine?: boolean;
  onDark?: boolean;
  color?: string;
}

export default function Eyebrow({
  children,
  className = '',
  noLine = false,
  onDark = false,
  color,
}: EyebrowProps) {
  const cls = `eyebrow ${noLine ? 'no-line' : ''} ${onDark ? 'on-dark' : ''} ${className}`.trim();
  return (
    <div className={cls} style={color ? { color } : undefined}>
      {children}
    </div>
  );
}
