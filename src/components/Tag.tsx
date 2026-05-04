// src/components/Tag.tsx
// Pill tag. Ports components.jsx Tag.
import type { ReactNode } from 'react';

export interface TagProps {
  children: ReactNode;
  color?: 'pink' | 'yellow' | 'green' | 'blue' | 'purple';
}

export default function Tag({ children, color = 'pink' }: TagProps) {
  return <span className={`tag tag-${color}`}>{children}</span>;
}
