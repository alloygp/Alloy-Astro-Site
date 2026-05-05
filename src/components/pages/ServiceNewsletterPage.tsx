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
    desc: 'Every issue researched and written for you — community news, industry insights, board-relevant tips. No blank page, no last-minute scramble.',
  },
  {
    icon: 'layout',
    title: 'Branded design',
    desc: 'A newsletter template built in your brand — colors, logo, fonts. Each issue is designed to look like it came from a company that has its act together.',
  },
  {
    icon: 'send',
    title: 'Send management',
    desc: 'List management, scheduling, and deliverability handled for you. Newsletters go out on time, every time, without living on your to-do list.',
  },
  {
    icon: 'bar-chart',
    title: 'Performance reporting',
    desc: 'Monthly open rates, click data, and list health delivered in plain language. You always know whether your boards are reading.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Brand match',
    desc: 'We build your newsletter template in your brand identity — colors, typography, logo placement. One-time setup, used every issue.',
  },
  {
    num: '02',
    title: 'Monthly content',
    desc: 'Our team researches, writes, and designs each issue. You review, approve, and send us any community-specific updates. We handle the rest.',
  },
  {
    num: '03',
    title: 'Send & report',
    desc: 'We manage scheduling and distribution. Each month you receive a plain-language performance report with open rates and takeaways.',
  },
];

export default function ServiceNewsletterPage() {
  return (
    <>
      <PageHero
        bg={BLUE_DEEP}
        eyebrow="BoardReach™ · Content"
        h1={<>Done-for-you HOA newsletters<br />your boards actually read.</>}
        sub="Most CAM companies know they should be sending regular newsletters. Few have time to produce them consistently. Alloy handles content, design, and delivery — so your firm shows up every month without adding to the team's plate."
      />

      {/* Deliverables */}
      <section className="section section-white">
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
              What's included
            </p>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '0 0 16px' }}>
              Everything it takes to run a professional HOA newsletter program.
            </h2>
            <p style={{ fontSize: 17, color: '#555', lineHeight: 1.65 }}>
              One subscription covers the full production cycle — from a blank calendar to a delivered issue in your boards' inboxes.
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

      {/* The business case */}
      <section className="section" style={{ background: 'var(--bg-ivory)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: PINK, marginBottom: 12 }}>
                Why it matters
              </p>
              <h2 className="display-md" style={{ color: PURPLE, margin: '0 0 20px' }}>
                Boards renew managers they hear from. Not just managers they remember.
              </h2>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 16 }}>
                A monthly HOA newsletter does something your proposal can't: it keeps your firm present between contracts. Boards that regularly receive helpful, well-produced communication from their management company are more likely to renew — and more likely to refer.
              </p>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 32 }}>
                Most CAM companies intend to send newsletters. They start, miss a month, lose the rhythm, and stop. Alloy's production model removes the execution burden entirely. Your newsletter goes out whether your team is slammed or not.
              </p>
              <Button variant="primary" arrow href="/strategic-review-request">Add this to your program</Button>
            </div>

            {/* Stat block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { val: '200+', label: 'Monthly searches for "HOA newsletter"', sub: 'Boards and CAM companies are actively looking for newsletter help. Your service page can intercept that search.' },
                { val: 'Zero', label: 'Competitors with a dedicated HOA newsletter page', sub: 'KD 0. No other marketing agency has staked a claim on this keyword. That window closes when someone builds the page.' },
                { val: '12×', label: 'Annual board touchpoints', sub: 'A monthly newsletter means 12 branded touchpoints per year — more than most CAM firms create in two contract cycles.' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: i === 0 ? '12px 12px 0 0' : i === 2 ? '0 0 12px 12px' : 0,
                  borderTop: i > 0 ? 'none' : undefined,
                  padding: '24px 28px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, color: BLUE_DEEP, lineHeight: 1, flexShrink: 0, minWidth: 64 }}>{s.val}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: PURPLE, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 13, color: '#777', lineHeight: 1.55 }}>{s.sub}</div>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 48,
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

      {/* Part of BoardReach */}
      <section className="section" style={{ background: BLUE_DEEP, color: '#fff' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE, marginBottom: 16 }}>
            Part of BoardReach™
          </p>
          <h2 className="display-md" style={{ color: '#fff', margin: '0 0 18px' }}>
            Newsletter production is one piece of a larger system.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: '0 auto 32px', maxWidth: 640 }}>
            Alloy's BoardReach engine combines SEO, content, social, email, and newsletter into a single coordinated program — built exclusively for CAM companies competing for management contracts in a defined metro.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" arrow href="/strategic-review-request">See if your market is available</Button>
            <Button variant="secondary" onDark href="/our-approach/boardreach">How BoardReach works</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
