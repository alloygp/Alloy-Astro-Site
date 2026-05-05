// src/components/pages/PricingPage.tsx
// Alloy — Pricing / BoardSuite Plans
// Transparent tier comparison. Three engines, three plans, one philosophy.

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Eyebrow from '~/components/Eyebrow';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';

// ── FAQ accordion ─────────────────────────────────────────────────────────────
interface FAQItemProps { q: string; a: string; bordered: boolean; accent: string; }
function FAQItem({ q, a, bordered, accent }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: bordered ? '1px solid var(--border-subtle)' : 'none' }}>
      <button type="button" onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 24, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE, letterSpacing: '-0.01em' }}>
        <span>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: open ? accent : 'var(--alloy-pink-tint)', color: open ? '#fff' : PURPLE, display: 'grid', placeItems: 'center', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'all 200ms var(--ease-standard)', flexShrink: 0 } as CSSProperties}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
        </span>
      </button>
      {open && <div className="reveal" style={{ padding: '0 28px 24px', color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 800 }}>{a}</div>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const fmt = (n: number) => '$' + n.toLocaleString();

  const tiers = [
    {
      name: 'Foundation',
      tag: "Fix what's leaking",
      mo: 4800, an: 4080,
      color: BLUE, accent: BLUE,
      best: 'CAM firms under 1,500 doors with no marketing function',
      headline: 'The right base layer before anything else compounds.',
      mostPopular: false,
      includes: [
        'Brand audit + identity refresh',
        'Website redesign (4 audiences: boards / RFPs / homeowners / talent)',
        'Local SEO + Google Business Profile optimization',
        'Review velocity engine (target: 10+ reviews/quarter)',
        'Print system foundation (proposal, deck, signage templates)',
        'Quarterly strategic review',
      ],
      notIncluded: ['Active prospecting', 'Paid acquisition', 'Content engine'],
    },
    {
      name: 'BoardSuite Growth',
      tag: 'The full system',
      mo: 8500, an: 7225,
      color: PINK, accent: PINK,
      best: 'CAM firms 1,500–5,000 doors building a real growth motion',
      headline: 'Three engines running. One playbook. One accountable team.',
      mostPopular: true,
      includes: [
        'Everything in Foundation, plus —',
        'BoardReach: AI search optimization, content engine (4 articles/mo)',
        'BoardReach: Paid acquisition (Google Ads + LinkedIn)',
        'BoardMatch: Proposal optimization + RFP response system',
        'BoardMatch: Sales messaging + UVP development',
        'BoardRetain: Newsletter production (monthly, branded)',
        'BoardRetain: Board education library (4 micro-courses)',
        'Monthly strategic review + quarterly board',
      ],
      notIncluded: ['Fractional BD prospecting', 'Custom course production'],
    },
    {
      name: 'BoardSuite Scale',
      tag: 'Compound through plateau',
      mo: 14500, an: 12325,
      color: YELLOW, accent: YELLOW,
      best: 'Multi-market operators 5,000+ doors hitting growth ceilings',
      headline: 'Active prospecting, custom systems, dedicated CAM operator.',
      mostPopular: false,
      includes: [
        'Everything in Growth, plus —',
        'Groundwork: Fractional BD (active prospecting, 40 conversations/mo)',
        'Custom course production (2 branded courses/yr)',
        'Multi-market local SEO (up to 5 metros)',
        'Custom CRM/portal integrations (Vantaca, AppFolio, Buildium)',
        'Dedicated CAM operator (not an account manager)',
        'Bi-weekly strategic review + monthly leadership board',
        'Annual industry research participation',
      ],
      notIncluded: ['M&A advisory (separate engagement)'],
    },
  ];

  const compareRows = [
    { dim: 'Strategic review cadence',  f: 'Quarterly',        g: 'Monthly',                s: 'Bi-weekly' },
    { dim: 'Brand + identity',          f: '✓ Refresh',         g: '✓ Refresh + system',     s: '✓ Full system + custom' },
    { dim: 'Website',                   f: '✓ Redesign',        g: '✓ Redesign + ongoing',   s: '✓ Multi-site + ongoing' },
    { dim: 'Local SEO',                 f: '1 metro',           g: '1 metro',                s: 'Up to 5 metros' },
    { dim: 'AI search / GEO',           f: '—',                 g: '✓ Full',                 s: '✓ Full + research' },
    { dim: 'Content engine',            f: '—',                 g: '4 articles / mo',        s: '8 articles / mo' },
    { dim: 'Paid acquisition',          f: '—',                 g: 'Google + LinkedIn',      s: 'Google + LinkedIn + Meta' },
    { dim: 'Proposal optimization',     f: '—',                 g: '✓ System',               s: '✓ System + custom' },
    { dim: 'Sales messaging',           f: '—',                 g: '✓',                      s: '✓ + BD scripts' },
    { dim: 'Fractional BD prospecting', f: '—',                 g: '—',                      s: '✓ 40 conversations / mo' },
    { dim: 'Newsletter production',     f: '—',                 g: 'Monthly',                s: 'Monthly + custom' },
    { dim: 'Board education library',   f: '—',                 g: '4 micro-courses',        s: 'Custom course production' },
    { dim: 'Print system',              f: '✓ Foundation',      g: '✓ Foundation + ongoing', s: '✓ Full + custom' },
    { dim: 'CRM/portal integrations',   f: '—',                 g: 'Standard',               s: 'Custom (Vantaca, AppFolio…)' },
    { dim: 'Dedicated CAM operator',    f: '—',                 g: 'Shared',                 s: 'Dedicated' },
    { dim: 'Market exclusivity',        f: '✓ ZIP',             g: '✓ Metro',                s: '✓ Multi-metro' },
  ];

  const philosophy = [
    { c: PINK,   h: 'One CAM firm per market.',       d: "We don't run identical playbooks for two competing firms in the same metro. Period. When you hire us, your competitor can't." },
    { c: YELLOW, h: 'All-in pricing.',                d: "Retainer covers all listed deliverables. No per-project line items, no surprise scope fees, no rate cards. The number you see is the number you pay." },
    { c: GREEN,  h: '12-month commitment.',           d: "Marketing compounds. We don't take month-to-month engagements because the math doesn't work — for you or for us. Real systems take 12 months minimum to mature." },
    { c: BLUE,   h: 'Outcomes, not deliverables.',    d: "Every quarter we report against a small set of board-level outcomes (lead volume, win rate, retention) — not how many blog posts we shipped." },
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero" style={{ background: PURPLE, color: '#fff', overflow: 'hidden', position: 'relative' }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-inner" style={{ position: 'relative', paddingTop: 88, paddingBottom: 56 } as CSSProperties}>
          <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: YELLOW, boxShadow: `0 0 0 4px ${YELLOW}40` }}></span>
              <Eyebrow onDark noLine>Pricing · BoardSuite Plans</Eyebrow>
            </div>
            <h1 className="display-xl" style={{ margin: '0 0 22px', color: '#fff' }}>
              Three plans. <span style={{ color: PINK }}>Three engines.</span><br />
              <span style={{ color: YELLOW }}>One number</span> per month.
            </h1>
            <p className="lead on-dark" style={{ marginBottom: 30, maxWidth: 660, margin: '0 auto 30px' }}>
              No rate cards. No project minimums. No "starting at" pricing that lands at 4× when you sign. Every retainer is all-in for the listed deliverables, billed monthly, with one CAM firm per market.
            </p>
            {/* Annual toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '8px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)' }}>
              <button
                onClick={() => setAnnual(false)}
                style={{ padding: '8px 18px', borderRadius: 999, background: !annual ? '#fff' : 'transparent', color: !annual ? PURPLE : 'rgba(255,255,255,0.7)', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >Monthly</button>
              <button
                onClick={() => setAnnual(true)}
                style={{ padding: '8px 18px', borderRadius: 999, background: annual ? '#fff' : 'transparent', color: annual ? PURPLE : 'rgba(255,255,255,0.7)', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Annual <span style={{ color: annual ? PINK : YELLOW, marginLeft: 6 }}>− 15%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIER CARDS ───────────────────────────────────────────────────────── */}
      <section className="section section-ivory" style={{ paddingTop: 56, paddingBottom: 56, position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
            {tiers.map(t => (
              <div key={t.name} style={{
                background: '#fff', borderRadius: 18, padding: '36px 32px', position: 'relative',
                border: t.mostPopular ? `2px solid ${t.color}` : '1px solid var(--border-subtle)',
                boxShadow: t.mostPopular ? `0 30px 60px ${t.color}25, 0 8px 20px rgba(0,0,0,0.06)` : '0 6px 16px rgba(0,0,0,0.04)',
                transform: t.mostPopular ? 'translateY(-12px)' : 'none',
                display: 'flex', flexDirection: 'column',
              } as CSSProperties}>
                {t.mostPopular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: t.color, color: '#fff', padding: '6px 16px', borderRadius: 999, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' } as CSSProperties}>Most chosen</div>
                )}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: t.color, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 } as CSSProperties}>{t.tag}</div>
                  <div className="display-md" style={{ fontSize: 28, color: PURPLE, marginBottom: 6, lineHeight: 1.1 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.55, marginBottom: 22, minHeight: 36 }}>{t.headline}</div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 48, color: PURPLE, letterSpacing: '-0.025em', lineHeight: 1 }}>
                      {fmt(annual ? t.an : t.mo)}
                    </div>
                    <div style={{ fontSize: 14, color: '#888', fontWeight: 600 }}>/ mo</div>
                  </div>
                  {annual && (
                    <div style={{ fontSize: 12, color: t.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: 10, fontWeight: 700 } as CSSProperties}>
                      Save {fmt((t.mo - t.an) * 12)}/yr · billed annually
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 22, lineHeight: 1.5 }}>
                    Best for: <span style={{ color: PURPLE, fontWeight: 600 }}>{t.best}</span>
                  </div>

                  <a href="/strategic-review-request" style={{
                    display: 'block', textAlign: 'center', padding: '13px 20px',
                    background: t.mostPopular ? t.color : '#fff',
                    color: t.mostPopular ? '#fff' : PURPLE,
                    border: t.mostPopular ? 'none' : `1.5px solid ${PURPLE}`,
                    borderRadius: 999, textDecoration: 'none',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                    marginBottom: 28, transition: 'all 0.15s',
                  } as CSSProperties}>Start with {t.name.replace('BoardSuite ', '')} →</a>

                  <div style={{ height: 1, background: 'var(--border-subtle)', marginBottom: 22 }}></div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#888', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 } as CSSProperties}>What's included</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                    {t.includes.map((it, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#333', lineHeight: 1.5 }}>
                        <Icon name="check" size={14} color={t.color} strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 } as CSSProperties} />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                  {t.notIncluded.length > 0 && (
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#aaa', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 } as CSSProperties}>Not included</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {t.notIncluded.map((it, i) => (
                          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>
                            <Icon name="x" size={12} color="#ccc" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 } as CSSProperties} />
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE TABLE ────────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 36, textAlign: 'center', maxWidth: 760, margin: '0 auto 36px' }}>
            <Eyebrow noLine>Side by side</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>What changes between tiers.</h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', padding: '18px 28px', background: PURPLE, color: '#fff', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>
              <div></div>
              <div style={{ textAlign: 'center', color: BLUE }}>Foundation</div>
              <div style={{ textAlign: 'center', color: PINK }}>Growth</div>
              <div style={{ textAlign: 'center', color: YELLOW }}>Scale</div>
            </div>
            {compareRows.map((row, i) => (
              <div key={row.dim} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', padding: '16px 28px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', alignItems: 'center', background: i % 2 ? '#fafaf7' : '#fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: PURPLE, fontSize: 14 }}>{row.dim}</div>
                <div style={{ fontSize: 13, color: row.f === '—' ? '#bbb' : '#333', textAlign: 'center' }}>{row.f}</div>
                <div style={{ fontSize: 13, color: row.g === '—' ? '#bbb' : '#333', textAlign: 'center', fontWeight: row.g !== '—' ? 600 : 400 }}>{row.g}</div>
                <div style={{ fontSize: 13, color: row.s === '—' ? '#bbb' : '#333', textAlign: 'center', fontWeight: row.s !== '—' ? 600 : 400 }}>{row.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────────── */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <Eyebrow onDark>How we price</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: '#fff' }}>Four rules that govern <span style={{ color: YELLOW }}>every retainer.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {philosophy.map(p => (
              <div key={p.h} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: `3px solid ${p.c}`, borderRadius: 12, padding: 28 }}>
                <div className="display-md" style={{ fontSize: 22, color: '#fff', marginBottom: 10 }}>{p.h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE-OFF ENGAGEMENTS ───────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 36, maxWidth: 760 }}>
            <Eyebrow>One-off engagements</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px 0 0', color: PURPLE }}>Not ready for the full system?</h2>
            <p style={{ marginTop: 14, color: '#555', fontSize: 15, lineHeight: 1.65, maxWidth: 660 }}>
              Some operators need one engine sharpened, not all three rebuilt. We take selective project work — typically when there's a strategic event in motion (large RFP, M&A, market expansion). Pricing is project-based.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { h: 'Strategic Review',        p: 'Free',          c: PINK,   d: '30-min diagnostic with a CAM operator. Written 90-day plan. Yours to keep.',                                               href: '/strategic-review-request' },
              { h: 'RFP Response Sprint',     p: '$8.5K – $14K',  c: YELLOW, d: 'End-to-end RFP response: research, narrative, deck, financials, exhibits. 10-day turnaround.',                            href: '/contact' },
              { h: 'Brand + Website Refresh', p: '$28K – $65K',   c: BLUE,   d: 'Standalone identity + website project. 60–90 days. Foundation tier without the ongoing retainer.',                       href: '/boardreach/hoa-management-branding' },
            ].map(o => (
              <a key={o.h} href={o.href} style={{ display: 'block', background: '#fff', borderRadius: 12, padding: 28, border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'inherit', borderTop: `3px solid ${o.c}`, transition: 'transform 0.15s, box-shadow 0.15s' } as CSSProperties}>
                <div className="display-md" style={{ fontSize: 22, color: PURPLE, marginBottom: 8 }}>{o.h}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: o.c, marginBottom: 12, letterSpacing: '-0.01em' }}>{o.p}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>{o.d}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: PURPLE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 } as CSSProperties}>Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING FAQ ──────────────────────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ marginBottom: 36, textAlign: 'center' }}>
            <Eyebrow noLine>Pricing questions</Eyebrow>
            <h2 className="display-lg" style={{ margin: '14px auto 0', color: PURPLE }}>Honest answers, plainly.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <FAQItem bordered={false} accent={PINK} q="Why is there a 12-month minimum?"
              a="Marketing systems compound. Months 1–3 are build. Months 4–6 are tuning. Months 7–12 are when the data actually starts answering questions. Anything shorter is paying for setup costs without seeing the return — and we're not in the business of selling that." />
            <FAQItem bordered accent={YELLOW} q="What does 'all-in' actually mean?"
              a="The retainer covers every deliverable in your tier — content production, paid spend management (not media spend itself), design, dev, strategy. There is no per-asset fee, no surcharge for revisions, no 'agency hours' meter. Media spend (Google Ads budget, mail-house print, etc.) is billed at cost, separately." />
            <FAQItem bordered accent={GREEN} q="Can we mix and match across tiers?"
              a="Selectively, yes — usually as add-ons to Foundation or Growth. Common requests: Foundation + Newsletter Production, or Growth + Fractional BD. We'll quote those at the Strategic Review based on scope. We don't unbundle Scale because the integrations are what make it Scale." />
            <FAQItem bordered accent={BLUE} q="What's the off-ramp if it isn't working?"
              a="At month 6 we run a formal joint review against the outcomes set in your engagement letter. If we're materially behind, you can either renegotiate scope or terminate without penalty. Five years in, we've activated this clause twice — both times it was the right call." />
            <FAQItem bordered accent={PURPLE} q="Do you take equity or rev-share?"
              a="No. Cash retainer only. We've turned down equity offers because alignment-via-incentives is a story we don't believe — alignment-via-results is the only one that holds up. Our outcomes show up monthly; so does the invoice." />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Want a real number for your situation?"
        sub="The Strategic Review covers tier fit. By the end of 30 minutes, you'll know which plan maps to your portfolio — and what it actually costs to run."
      />
    </>
  );
}
