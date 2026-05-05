// src/components/modules/ROICalculator.tsx
// Year-one revenue impact calculator. Ported from modules.jsx.
import { useState } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import { PURPLE, PINK, YELLOW, GREEN } from '~/lib/tokens';

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
}

function RangeInput({ label, value, min, max, step, prefix = '', suffix = '', onChange }: RangeInputProps) {
  const fillPct = (((value - min) / (max - min)) * 100).toFixed(2) + '%';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 8 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: YELLOW, lineHeight: 1.3 }}>{label}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, letterSpacing: '-0.018em', lineHeight: 1, marginBottom: 16 }}>
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        className="alloy-chunky-range"
        style={{ ['--alloy-range-fill' as any]: fillPct }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.5, marginTop: 8 }}>
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

interface ResultCellProps {
  color: string;
  label: string;
  value: string;
  sub: string;
}

function ResultCell({ color, label, value, sub }: ResultCellProps) {
  return (
    <div style={{ borderTop: `3px solid ${color}`, paddingTop: 16 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.022em', lineHeight: 1, color, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

export default function ROICalculator() {
  const [associations, setAssociations] = useState(120);
  const [doors, setDoors] = useState(180);
  const [costPerDoor, setCostPerDoor] = useState(22);
  const churn = 0.12;
  const newWinsToday = Math.round(associations * 0.05);

  const avgFee = doors * costPerDoor * 12;
  const newWinsAlloy = Math.round(newWinsToday * 3.2);
  const churnSaved = Math.round(associations * churn * 0.30);
  const yearOneRevenue = (newWinsAlloy + churnSaved) * avgFee;

  const fmtBig = (n: number) =>
    n >= 1000000 ? '$' + (n / 1000000).toFixed(2) + 'M' : '$' + Math.round(n / 1000) + 'k';

  return (
    <div style={{ background: PURPLE, borderRadius: 16, padding: 0, color: '#fff', overflow: 'hidden', boxShadow: '0 24px 60px rgba(56,28,79,0.30)' }}>
      <div style={{ padding: '40px 44px 36px' }}>
        <Eyebrow onDark noLine>Engineered growth · Year-one estimate</Eyebrow>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '10px 0 28px' }}>
          What does engineered growth look like for your portfolio?
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, marginBottom: 28 }}>
          <RangeInput label="Associations under management" value={associations} min={20} max={400} step={5} onChange={setAssociations} />
          <RangeInput label="Avg doors per association" value={doors} min={20} max={600} step={5} onChange={setDoors} />
          <RangeInput label="Cost per door (monthly)" value={costPerDoor} min={8} max={60} step={1} prefix="$" suffix="/mo" onChange={setCostPerDoor} />
        </div>
        <div style={{ fontSize: 12, opacity: 0.55, fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
          Modeled annual fee per association · <span style={{ color: YELLOW, opacity: 1 }}>${avgFee.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.18)', padding: '32px 44px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <ResultCell color={PINK} label="New contracts (Yr 1)" value={`+${newWinsAlloy}`} sub={`vs ~${newWinsToday} today (3.2× lift modeled)`} />
        <ResultCell color={GREEN} label="Churn prevented" value={`+${churnSaved}`} sub="associations retained vs 12% baseline" />
        <ResultCell color={YELLOW} label="Year-one revenue impact" value={fmtBig(yearOneRevenue)} sub="based on RISE AMG benchmarks" />
      </div>
      <div style={{ padding: '24px 44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.6, maxWidth: '60%', lineHeight: 1.5 }}>
          Estimates use Alloy's modeled lift (3.2× new wins, 30% churn reduction) on an average 12% baseline churn rate. Real outcomes depend on engagement scope and market.
        </div>
        <Button variant="primary" arrow href="/strategic-review-request">Build my model</Button>
      </div>
    </div>
  );
}
