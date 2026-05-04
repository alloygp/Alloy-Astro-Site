// src/components/pages/ContactPage.tsx
// Ported from pages.jsx ContactPage() + Field helper.
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { PURPLE, PINK, YELLOW } from '~/lib/tokens';

interface FormState { name: string; company: string; email: string; market: string; associations: string; challenge: string; }

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', company: '', email: '', market: '', associations: '', challenge: '' });
  const update = (k: keyof FormState, v: string) => setForm({ ...form, [k]: v });

  return (
    <section style={{ background: PURPLE, minHeight: 'calc(100vh - 80px)', color: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 90% 10%, rgba(217,53,110,0.30) 0%, transparent 50%), radial-gradient(circle at 0% 90%, rgba(245,216,128,0.10) 0%, transparent 50%)' }}></div>
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>
        <div>
          <Eyebrow onDark>Claim Your Market</Eyebrow>
          <h1 className="display-xl" style={{ margin: '16px 0 20px', color: '#fff' }}>30 minutes.<br/>No pitch.<br/><span style={{ color: YELLOW }}>Just diagnostic clarity.</span></h1>
          <p className="lead on-dark" style={{ marginBottom: 36 }}>Tell us about your CAM firm. We'll confirm whether your metro is open and book a 30-minute diagnostic — where the leaks are, which engine to fix first, and what the next 18 months could look like.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: 'phone', label: 'Direct', value: '210-845-5989' },
              { icon: 'mail', label: 'Email', value: 'contact@alloygp.co' },
              { icon: 'map-pin', label: 'HQ', value: 'Austin, TX · Nationwide' },
              { icon: 'calendar', label: 'Hours', value: 'Mon–Fri · 8a–6p CT' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={c.icon} size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: YELLOW }}>{c.label}</div>
                  <div style={{ fontSize: 16, color: '#fff', fontWeight: 500 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 40, color: PURPLE }}>
            {submitted ? (
              <div className="reveal" style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--alloy-green-tint)', color: '#2c6a62', margin: '0 auto 20px', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={40} strokeWidth={2.5} />
                </div>
                <h2 className="display-md" style={{ color: PURPLE, margin: '0 0 12px' }}>Got it. We'll be in touch within one business day.</h2>
                <p style={{ color: '#555', lineHeight: 1.6 }}>If your market is still open, we'll send a calendar link for the 30-minute diagnostic. If it's already claimed, we'll add you to the waitlist and let you know if it opens.</p>
              </div>
            ) : (
              <>
                <div className="display-md" style={{ color: PURPLE, fontSize: 24, marginBottom: 6 }}>Tell us about your firm</div>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>30 seconds. Five fields. Real human reply within one business day.</p>
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Your name" value={form.name} onChange={v => update('name', v)} required />
                    <Field label="CAM company" value={form.company} onChange={v => update('company', v)} required />
                  </div>
                  <Field label="Work email" type="email" value={form.email} onChange={v => update('email', v)} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
                    <Field label="Primary metro" value={form.market} placeholder="City, State" onChange={v => update('market', v)} required />
                    <Field label="Associations under management" value={form.associations} placeholder="e.g. 120" onChange={v => update('associations', v)} />
                  </div>
                  <Field label="Biggest growth challenge" value={form.challenge} onChange={v => update('challenge', v)} multiline placeholder="One sentence is fine." />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 12, color: '#888', maxWidth: '60%' }}>By submitting, you agree to a real conversation. We won't spam you.</div>
                    <Button variant="primary" arrow>Request my diagnostic</Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}
export function Field({ label, value, onChange, type = 'text', required, placeholder, multiline }: FieldProps) {
  const sharedStyle: React.CSSProperties = {
    padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-strong)',
    fontSize: 15, fontFamily: 'var(--font-body)', color: PURPLE, outline: 'none',
    background: '#fff', resize: multiline ? 'vertical' : 'none',
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: PURPLE }}>
        {label}{required && <span style={{ color: PINK, marginLeft: 4 }}>*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={3}
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}
