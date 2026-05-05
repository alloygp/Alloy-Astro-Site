// src/components/pages/ServiceNewsletterPage.tsx
// Service page: HOA Newsletter Production
// Target keyword: "hoa newsletter" — 200/mo, KD 0
import { PageHero, CtaBand } from '~/components/sections/Shells';
import Icon from '~/components/Icon';
import Button from '~/components/Button';
import { PURPLE, PINK, YELLOW, BLUE, BLUE_DEEP } from '~/lib/tokens';

const DELIVERABLES = [
  {
    icon: 'pencil',
    title: 'Content writing',
    desc: 'Every issue researched and written by Alloy — board-relevant topics, industry updates, and community management insights. No blank page, no deadline scramble for your team.',
  },
  {
    icon: 'layout',
    title: 'Branded design',
    desc: 'A newsletter template built in your brand — colors, logo, typography. Each issue is designed to look like it came from a company that takes communication seriously.',
  },
  {
    icon: 'send',
    title: 'Send management',
    desc: 'List hygiene, scheduling, and deliverability handled end to end. Your newsletter reaches boards on time every month without living on your team\'s to-do list.',
  },
  {
    icon: 'bar-chart',
    title: 'Performance reporting',
    desc: 'Open rates, click data, and list health delivered in plain language each month. You always know whether your boards are reading — and what they\'re clicking.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Brand match',
    desc: 'We build your newsletter template in your visual identity — colors, typography, logo placement. One-time setup that every future issue uses.',
  },
  {
    num: '02',
    title: 'Monthly production',
    desc: 'Alloy researches, writes, and designs each issue. You review, approve, and flag any community-specific updates. We handle the rest.',
  },
  {
    num: '03',
    title: 'Send & report',
    desc: 'We manage scheduling and distribution. Each month you receive a plain-language performance report — open rates, list health, takeaways.',
  },
];

const CAM_TRUTHS = [
  {
    stat: '12 vs. 2',
    label: 'Touchpoints per year',
    desc: 'A monthly newsletter puts your brand in front of boards 12 times a year. Most CAM companies manage two — renewal time and when something goes wrong.',
  },
  {
    stat: 'The gap',
    label: 'Between manager and company',
    desc: 'When a manager leaves, boards start questioning everything. A company-level newsletter keeps your brand stable when individual relationships shift.',
  },
  {
    stat: 'Seen first',
    label: 'Before the RFP',
    desc: 'Boards rarely cold-search for a new management company. They choose the firm they\'ve already been hearing from. Newsletters build that position before renewal season starts.',
  },
];

export default function ServiceNewsletterPage() {
  return (
    <>
      <PageHero
        bg={BLUE_DEEP}
        eyebrow="BoardReach™ · Content"
        h1={<>Done-for-you HOA newsletters<br />your boards actually read.</>}
        sub="Most CAM companies know they should be communicating with their boards between meetings. Few have time to do it consistently. Alloy handles content, design, and delivery — so your firm shows up every month without adding to your team's plate."
      />

      {/* Deliverables */}
      <section className="section section-white">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
              What's included
            </p>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '0 0 16px' }}>
              Everything it takes to run a professional newsletter program for your boards.
            </h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.65 }}>
              One engagement covers the full production cycle — from a blank calendar to a delivered issue in your boards' inboxes each month.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="card card-pad" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'var(--alloy-blue-tint)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <Icon name={d.icon} size={20} color={BLUE_DEEP} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: PURPLE, marginBottom: 8 }}>
                    {d.title}
                  </div>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters — CAM truths */}
      <section className="section" style={{ background: 'var(--bg-ivory)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left: positioning copy */}
            <div>
              <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
                Why it matters
              </p>
              <h2 className="display-md" style={{ color: PURPLE, margin: '0 0 20px' }}>
                Boards renew the management company they've been hearing from — not just the one they remember.
              </h2>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>
                A monthly newsletter does something your proposal can't: it keeps your company present between contracts. Boards that receive consistent, professionally produced communication from their management company enter renewal season already inclined to stay.
              </p>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 32 }}>
                Most CAM companies intend to send newsletters. They start, miss a month, lose the rhythm, and stop. Alloy's production model removes that execution burden entirely. Your newsletter goes out whether your team is slammed or not.
              </p>
              <Button variant="primary" arrow href="/strategic-review-request">Add this to your program</Button>
            </div>

            {/* Right: CAM truths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CAM_TRUTHS.map((t, i) => (
                <div key={t.stat} style={{
                  background: '#fff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: i === 0 ? '12px 12px 0 0' : i === CAM_TRUTHS.length - 1 ? '0 0 12px 12px' : 0,
                  borderTop: i > 0 ? 'none' : undefined,
                  padding: '24px 28px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}>
                  <div style={{ flexShrink: 0, minWidth: 72 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, color: YELLOW, lineHeight: 1, background: PURPLE, padding: '6px 10px', borderRadius: 8, display: 'inline-block', whiteSpace: 'nowrap' }}>
                      {t.stat}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: PURPLE, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-white">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
              How it works
            </p>
            <h2 className="display-md" style={{ color: PURPLE, margin: 0 }}>
              Up and running in one onboarding call.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 52,
                  color: 'var(--alloy-blue-tint)', lineHeight: 1, letterSpacing: '-0.04em',
                }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: PURPLE }}>
                  {s.title}
                </div>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        headline="The CAM companies boards remember are the ones that showed up all year."
        sub="Newsletter production is part of Alloy's BoardReach engine — a full program for getting your firm found, heard, and selected by the right boards in your market."
      />
    </>
  );
}
