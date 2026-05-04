// src/components/Button.tsx
// Brand button — ports the components.jsx Button component verbatim.
import type { ReactNode, CSSProperties } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark';
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  arrow?: boolean;
  size?: 'sm' | 'md';
  onDark?: boolean;
  className?: string;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  href,
  arrow = false,
  size = 'md',
  onDark = false,
  className = '',
  style = {},
  type,
}: ButtonProps) {
  const cls = [
    'btn',
    `btn-${variant}`,
    arrow ? 'btn-arrow' : '',
    size === 'sm' ? 'btn-sm' : '',
    onDark ? 'on-dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? 'button'} className={cls} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
