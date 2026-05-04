// src/components/AccentBar.tsx
// Five-color stripe used at the top of the footer + occasional dividers.
// Pure CSS animation defined in site.css → .accent-bar.animated.

export interface AccentBarProps {
  height?: number;
  animated?: boolean;
  className?: string;
}

export default function AccentBar({
  height = 6,
  animated = false,
  className = '',
}: AccentBarProps) {
  const cls = `accent-bar ${animated ? 'animated' : ''} ${className}`.trim();
  return (
    <div className={cls} style={{ height }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
