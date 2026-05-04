// src/components/PillarMark.tsx
// Ported from pillar-marks.jsx — narrative duotone pillar marks (Reach/Match/Retain),
// service-icon set, and PillarIcon helper. PillarStub omitted (was for tweak preview).

export type PillarKey = 'reach' | 'match' | 'retain';

interface MarkProps { color?: string; size?: number; accent?: string; }

export function ReachMark({ color = '#d9356e', size = 56, accent = '#fbe2eb' }: MarkProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 28 L28 8 A20 20 0 0 1 48 28 Z" fill={accent} opacity="0.85" />
      <circle cx="28" cy="28" r="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 4" opacity="0.55" />
      <path d="M10 28a18 18 0 0 1 18 -18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 28a12 12 0 0 1 12 -12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 28a6 6 0 0 1 6 -6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="28" cy="28" r="2.2" fill={color} />
      <circle cx="44" cy="14" r="2.6" fill={color} />
      <circle cx="44" cy="14" r="5.5" stroke={color} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

export function MatchMark({ color = '#d4a916', size = 56, accent = '#fbf2d6' }: MarkProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="20" height="28" rx="3" fill={accent} opacity="0.85" />
      <rect x="30" y="14" width="20" height="28" rx="3" fill={accent} opacity="0.5" />
      <path d="M14 14 L8 14 L8 42 L14 42" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 14 L48 14 L48 42 L42 42" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 28 L36 28" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="28" r="3" fill="#fff" stroke={color} strokeWidth="1.8" />
      <circle cx="36" cy="28" r="3" fill={color} />
      <circle cx="28" cy="20" r="1.4" fill={color} opacity="0.5" />
      <circle cx="28" cy="36" r="1.4" fill={color} opacity="0.5" />
    </svg>
  );
}

export function RetainMark({ color = '#7eb8af', size = 56, accent = '#dceeea' }: MarkProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="14" fill={accent} opacity="0.85" />
      <ellipse cx="28" cy="28" rx="22" ry="10" stroke={color} strokeWidth="1.6" strokeLinecap="round" transform="rotate(-22 28 28)" opacity="0.6" />
      <circle cx="28" cy="28" r="9" stroke={color} strokeWidth="1.8" />
      <circle cx="28" cy="28" r="2.4" fill={color} />
      <circle cx="48" cy="20" r="2.6" fill={color} />
      <circle cx="48" cy="20" r="4.5" stroke={color} strokeWidth="1.1" opacity="0.35" />
      <circle cx="9" cy="36" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

interface PillarMarkProps { pillar: PillarKey; size?: number; color?: string; accent?: string; }
export default function PillarMark({ pillar, size = 56, color, accent }: PillarMarkProps) {
  const defaults: Record<PillarKey, { color: string; accent: string }> = {
    reach:  { color: '#d9356e', accent: '#fbe2eb' },
    match:  { color: '#d4a916', accent: '#fbf2d6' },
    retain: { color: '#7eb8af', accent: '#dceeea' },
  };
  const d = defaults[pillar] || defaults.reach;
  const c = color || d.color;
  const a = accent || d.accent;
  if (pillar === 'match')  return <MatchMark  color={c} accent={a} size={size} />;
  if (pillar === 'retain') return <RetainMark color={c} accent={a} size={size} />;
  return <ReachMark color={c} accent={a} size={size} />;
}

interface ServiceMarkProps { name: string; color?: string; accent?: string; size?: number; }
export function ServiceMark({ name, color = '#d9356e', accent = '#fbe2eb', size = 28 }: ServiceMarkProps) {
  const s = size;
  const props = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none' as const,
    stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  const Tint = ({ d }: { d: string }) => <path d={d} fill={accent} stroke="none" opacity="0.85" />;

  switch (name) {
    case 'search':
      return <svg {...props}><Tint d="M3 11a8 8 0 1 1 16 0 8 8 0 0 1-16 0z" /><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 L21 21" /><circle cx="11" cy="11" r="2.4" fill={color} stroke="none" /></svg>;
    case 'book':
      return <svg {...props}><Tint d="M5 4 H17 a2 2 0 0 1 2 2 v14 H5 a2 2 0 0 1 -2 -2 V6 a2 2 0 0 1 2 -2 z" /><path d="M5 4h12a2 2 0 0 1 2 2v14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M8 8 h7 M8 12 h7 M8 16 h4" /></svg>;
    case 'trending':
      return <svg {...props}><Tint d="M3 17 L9 11 L13 14 L21 6 L21 17 z" /><path d="M3 17 L9 11 L13 14 L21 6" /><path d="M16 6 H21 V11" /></svg>;
    case 'mail':
      return <svg {...props}><Tint d="M3 6 H21 V18 H3 z" /><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 7 L12 13 L21 7" /></svg>;
    case 'users':
      return <svg {...props}><Tint d="M5 19 a4 4 0 0 1 4 -4 h2 a4 4 0 0 1 4 4 z" /><circle cx="10" cy="9" r="3.2" /><path d="M5 19 a4 4 0 0 1 4 -4 h2 a4 4 0 0 1 4 4" /><circle cx="17" cy="10" r="2.2" /><path d="M15.5 19 h5 a3 3 0 0 0 -3 -3" /></svg>;
    case 'puzzle':
      return <svg {...props}><Tint d="M5 5 H11 V8 a1.6 1.6 0 1 0 2 0 V5 h6 v6 h-3 a1.6 1.6 0 1 0 0 2 h3 v6 h-6 v-3 a1.6 1.6 0 1 0 -2 0 v3 H5 v-6 h3 a1.6 1.6 0 1 0 0 -2 H5 z" /><path d="M5 5 H11 V8 a1.6 1.6 0 1 0 2 0 V5 h6 v6 h-3 a1.6 1.6 0 1 0 0 2 h3 v6 h-6 v-3 a1.6 1.6 0 1 0 -2 0 v3 H5 v-6 h3 a1.6 1.6 0 1 0 0 -2 H5 z" /></svg>;
    case 'file-sig':
      return <svg {...props}><Tint d="M6 3 H14 L19 8 V21 H6 z" /><path d="M6 3 H14 L19 8 V21 H6 z" /><path d="M14 3 V8 H19" /><path d="M9 17 c1.5 -2 3 -2 4.5 0" /></svg>;
    case 'shield':
      return <svg {...props}><Tint d="M12 3 L20 6 V12 c0 5 -3.6 8 -8 9 c -4.4 -1 -8 -4 -8 -9 V6 z" /><path d="M12 3 L20 6 V12 c0 5 -3.6 8 -8 9 c -4.4 -1 -8 -4 -8 -9 V6 z" /><path d="M9 12 L11 14 L15 10" /></svg>;
    case 'repeat':
      return <svg {...props}><Tint d="M5 8 a4 4 0 0 1 4 -4 h7 v3 l4 -4 -4 -4 v3 h-7 a6 6 0 0 0 -6 6 z" /><path d="M16 4 H9 a4 4 0 0 0 -4 4" /><path d="M16 1 V7" /><path d="M19 4 L16 1 M19 4 L16 7" /><path d="M8 20 H15 a4 4 0 0 0 4 -4" /><path d="M8 23 V17" /><path d="M5 20 L8 17 M5 20 L8 23" /></svg>;
    case 'users-board':
      return <svg {...props}><Tint d="M3 19 a4 4 0 0 1 4 -4 h10 a4 4 0 0 1 4 4 z" /><circle cx="8" cy="8" r="2.4" /><circle cx="16" cy="8" r="2.4" /><path d="M3 19 a4 4 0 0 1 4 -4 h10 a4 4 0 0 1 4 4" /></svg>;
    case 'lock':
      return <svg {...props}><Tint d="M5 11 H19 V21 H5 z" /><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11 V7 a4 4 0 1 1 8 0 V11" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="4" fill={color} stroke="none" /></svg>;
  }
}

interface PillarIconProps { pillar?: PillarKey; name: string; size?: number; }
export function PillarIcon({ pillar = 'reach', name, size = 28 }: PillarIconProps) {
  const palettes: Record<PillarKey, { color: string; accent: string }> = {
    reach:  { color: '#d9356e', accent: '#fbe2eb' },
    match:  { color: '#d4a916', accent: '#fbf2d6' },
    retain: { color: '#7eb8af', accent: '#dceeea' },
  };
  const p = palettes[pillar] || palettes.reach;
  return <ServiceMark name={name} color={p.color} accent={p.accent} size={size} />;
}
