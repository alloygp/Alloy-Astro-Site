// src/components/EngineLoop.tsx
// Small ambient SVG animation for each pillar tab/card.
// Three motifs sharing a visual language (1.6 stroke, round caps, duotone):
//   reach  — radar arcs sweeping outward
//   match  — two interlocking arcs meeting at a contract dot
//   retain — orbit cycling around a protected center
//
// Always animating. Inactive tabs run at 0.5x speed and lower opacity.

export interface EngineLoopProps {
  pillar?: 'reach' | 'match' | 'retain';
  active?: boolean;
  size?: number;
}

export default function EngineLoop({
  pillar = 'reach',
  active = false,
  size = 44,
}: EngineLoopProps) {
  const palettes = {
    reach: { color: '#d9356e', accent: '#fbe2eb' },
    match: { color: '#d4a916', accent: '#fbf2d6' },
    retain: { color: '#7eb8af', accent: '#dceeea' },
  };
  const p = palettes[pillar] || palettes.reach;
  const speed = active ? 1 : 0.5;
  const opacity = active ? 1 : 0.55;
  const stroke = active ? p.color : '#fff';
  const accent = active ? p.accent : 'rgba(255,255,255,0.10)';

  const inner = (() => {
    if (pillar === 'match') return <MatchLoop color={stroke} accent={accent} speed={speed} />;
    if (pillar === 'retain') return <RetainLoop color={stroke} accent={accent} speed={speed} />;
    return <ReachLoop color={stroke} accent={accent} speed={speed} />;
  })();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: active ? p.accent : 'rgba(255,255,255,0.06)',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        transition: 'all 280ms var(--ease-standard)',
        opacity,
      }}
    >
      {inner}
    </div>
  );
}

interface LoopProps {
  color: string;
  accent: string;
  speed: number;
}

function ReachLoop({ color, accent, speed }: LoopProps) {
  const dur = (3.0 / speed).toFixed(2) + 's';
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill={accent} opacity="0.85" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="14" cy="14" r="3" stroke={color} strokeWidth="1.4" fill="none" opacity="0">
          <animate
            attributeName="r"
            from="3"
            to="11"
            dur={dur}
            begin={`${i * (3 / 3 / speed)}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0"
            dur={dur}
            begin={`${i * (3 / 3 / speed)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      <circle cx="14" cy="14" r="2.4" fill={color} />
    </svg>
  );
}

function MatchLoop({ color, accent, speed }: LoopProps) {
  const dur = (4.0 / speed).toFixed(2) + 's';
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill={accent} opacity="0.85" />
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M7 8 L11 14 L7 20">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 1.2 0; 0 0"
            dur={dur}
            repeatCount="indefinite"
          />
        </path>
        <path d="M21 8 L17 14 L21 20">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -1.2 0; 0 0"
            dur={dur}
            repeatCount="indefinite"
          />
        </path>
      </g>
      <circle cx="14" cy="14" r="2" fill={color}>
        <animate attributeName="r" values="1.6;2.6;1.6" dur={dur} repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RetainLoop({ color, accent, speed }: LoopProps) {
  const dur = (5.0 / speed).toFixed(2) + 's';
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill={accent} opacity="0.85" />
      <circle cx="14" cy="14" r="3.2" fill={color} opacity="0.18" />
      <circle cx="14" cy="14" r="2" fill={color} />
      <circle
        cx="14"
        cy="14"
        r="9"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
        strokeDasharray="3 3"
      />
      <g>
        <circle cx="14" cy="5" r="1.8" fill={color} />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 14 14"
          to="360 14 14"
          dur={dur}
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
