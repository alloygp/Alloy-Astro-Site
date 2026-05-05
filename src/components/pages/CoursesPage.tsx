// src/components/pages/CoursesPage.tsx
import { useState, useCallback, type CSSProperties } from 'react';
import Button from '~/components/Button';
import Eyebrow from '~/components/Eyebrow';
import { CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

// ─── Progress reset modal ────────────────────────────────────────────────────

function CourseProgressControl() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const countKeys = useCallback(() => {
    try {
      return Object.keys(localStorage).filter(k =>
        k.startsWith('alloy:course:') ||
        k.startsWith('alloy:progress:') ||
        k.startsWith('alloy:quiz:')
      ).length;
    } catch { return 0; }
  }, []);

  const handleClear = useCallback(() => {
    try {
      Object.keys(localStorage)
        .filter(k =>
          k.startsWith('alloy:course:') ||
          k.startsWith('alloy:progress:') ||
          k.startsWith('alloy:quiz:')
        )
        .forEach(k => localStorage.removeItem(k));
    } catch { /* noop */ }
    setDone(true);
    setTimeout(() => { setOpen(false); setDone(false); }, 1600);
  }, []);

  const n = countKeys();
  if (n === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa',
        }}
      >
        Reset progress ({n} saved)
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(24,10,38,0.55)',
            backdropFilter: 'blur(4px)', zIndex: 9000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16, padding: 36,
              maxWidth: 400, width: '90%', textAlign: 'center',
              boxShadow: '0 24px 64px rgba(56,28,79,0.22)',
            }}
          >
            {done ? (
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: GREEN }}>
                Progress cleared ✓
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: PURPLE, marginBottom: 12 }}>
                  Reset all course progress?
                </div>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 24 }}>
                  This will clear your lesson checkmarks, quiz scores, and completion badges
                  for all {n} saved item{n !== 1 ? 's' : ''}. You can re-take any course afterward.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      padding: '10px 22px', borderRadius: 8,
                      border: '1.5px solid var(--border-subtle)',
                      background: '#fff', fontFamily: 'var(--font-display)',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer', color: PURPLE,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClear}
                    style={{
                      padding: '10px 22px', borderRadius: 8,
                      border: 'none', background: PINK,
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 13, cursor: 'pointer', color: '#fff',
                    }}
                  >
                    Yes, reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── SVG stripe pattern (decorative) ─────────────────────────────────────────

function StripePattern({ id, color }: { id: string; color: string }) {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <pattern id={id} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0" y="0" width="5" height="10" fill={color} fillOpacity="0.12" />
        </pattern>
      </defs>
    </svg>
  );
}

// ─── Card image band with optional pill ──────────────────────────────────────

function CardImageBand({
  color, pill, pillBg,
}: { color: string; pill?: string; pillBg?: string }) {
  return (
    <div style={{
      height: 120, background: color,
      borderRadius: '12px 12px 0 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <StripePattern id={`stripe-${color.replace('#', '')}`} color="#fff" />
      <rect
        x="0" y="0" width="100%" height="100%"
        fill={`url(#stripe-${color.replace('#', '')})`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' } as CSSProperties}
      />
      {pill && (
        <span style={{
          position: 'absolute', bottom: 10, left: 14,
          background: pillBg || 'rgba(0,0,0,0.35)',
          color: '#fff', fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 10, letterSpacing: '0.14em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
        }}>
          {pill}
        </span>
      )}
    </div>
  );
}

// ─── Featured course card (hero right column) ─────────────────────────────────

function FeaturedCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(56,28,79,0.18)',
    }}>
      {/* Image band */}
      <div style={{
        height: 160, background: `linear-gradient(135deg, ${YELLOW} 0%, #e8c840 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <pattern id="stripe-featured" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect x="0" y="0" width="5" height="10" fill="#fff" fillOpacity="0.15" />
            </pattern>
          </defs>
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: 'url(#stripe-featured)' }} />
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: PURPLE, color: '#fff',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '5px 12px', borderRadius: 999,
        }}>
          New course
        </div>
        <div style={{
          position: 'absolute', bottom: 14, left: 16,
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 40, color: PURPLE, lineHeight: 1, opacity: 0.15,
          letterSpacing: '-0.04em',
        }}>
          AI
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{
          display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999',
        }}>
          <span>Foundations</span>
          <span style={{ width: 3, height: 3, background: '#ccc', borderRadius: 999, display: 'inline-block' }} />
          <span>5 lessons</span>
          <span style={{ width: 3, height: 3, background: '#ccc', borderRadius: 999, display: 'inline-block' }} />
          <span>45 min</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
          color: PURPLE, lineHeight: 1.15, marginBottom: 10,
        }}>
          Outsmarting AI Search
        </div>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: '0 0 18px' }}>
          From AI-search fundamentals to citation strategy. Built for CAM operators who want to be the answer ChatGPT cites.
        </p>
        <div style={{
          display: 'inline-block',
          background: 'rgba(245,216,128,0.25)', color: PURPLE,
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '6px 14px', borderRadius: 999,
        }}>
          Coming soon — join waitlist
        </div>
      </div>
    </div>
  );
}

// ─── Active course card ───────────────────────────────────────────────────────

interface ActiveCourse {
  title: string;
  desc: string;
  color: string;
  level: string;
  lessons: number;
  time: string;
  href: string | null;
  pill?: string;
}

function ActiveCourseCard({ c }: { c: ActiveCourse }) {
  const isLive = !!c.href;
  const Wrapper = isLive ? 'a' : 'div';
  const wrapperProps = isLive
    ? { href: c.href as string, style: { textDecoration: 'none', display: 'block' } }
    : { style: { display: 'block' } as CSSProperties };

  return (
    <Wrapper {...(wrapperProps as any)} className={isLive ? 'course-card-live' : undefined}>
      <div style={{
        background: '#fff', borderRadius: 14,
        border: '1.5px solid var(--border-subtle)',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(56,28,79,0.07)',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 180ms, transform 180ms',
        height: '100%',
      }}
        onMouseEnter={isLive ? e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(56,28,79,0.14)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        } : undefined}
        onMouseLeave={isLive ? e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(56,28,79,0.07)';
          (e.currentTarget as HTMLElement).style.transform = '';
        } : undefined}
      >
        {/* Color band */}
        <div style={{
          height: 8, background: c.color,
        }} />
        <div style={{ padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center',
            fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#aaa',
          }}>
            <span>{c.level}</span>
            <span style={{ width: 3, height: 3, background: '#ddd', borderRadius: 999, display: 'inline-block' }} />
            <span>{c.lessons} lessons</span>
            <span style={{ width: 3, height: 3, background: '#ddd', borderRadius: 999, display: 'inline-block' }} />
            <span>{c.time}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20,
            color: PURPLE, lineHeight: 1.2,
          }}>
            {c.title}
          </div>
          <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0, flex: 1 }}>
            {c.desc}
          </p>
          <div style={{ paddingTop: 4 }}>
            {isLive ? (
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                color: c.color, letterSpacing: '0.06em',
              }}>
                Start course →
              </span>
            ) : (
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#bbb',
              }}>
                Launching soon
              </span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

// ─── Coming-soon card ─────────────────────────────────────────────────────────

function ComingSoonCard({ title, category }: { title: string; category: string }) {
  return (
    <div
      aria-disabled="true"
      style={{
        background: '#fafafa', borderRadius: 12,
        border: '1.5px dashed var(--border-subtle)',
        padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8,
        opacity: 0.72,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb',
      }}>
        {category}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
        color: '#999', lineHeight: 1.3,
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ccc',
        marginTop: 4,
      }}>
        In production
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursesPage() {

  const activeCourses: ActiveCourse[] = [
    {
      title: 'Building Trust as a CAM',
      desc: "Why trust — not service quality — decides which CAM firms boards renew, refer, and rave about. Six tight lessons plus a knowledge check.",
      color: PINK,
      level: 'Foundations',
      lessons: 6,
      time: '40 min',
      href: '/courses/trust-building',
    },
    {
      title: 'Proposal Anatomy That Wins',
      desc: 'The 7-section RFP framework that flips your win rate. Templates, narrative builds, and pricing presentation.',
      color: GREEN,
      level: 'Intermediate',
      lessons: 7,
      time: '75 min',
      href: null,
    },
    {
      title: 'Build a Board Education Engine',
      desc: 'How to launch a branded learning library that boards return to — and how to use it as a retention engine.',
      color: BLUE,
      level: 'Foundations',
      lessons: 6,
      time: '60 min',
      href: null,
    },
    {
      title: 'The Manager-Transition Playbook',
      desc: 'Reduce manager-turnover-driven churn with a transition checklist, comms cadence, and 90-day plan.',
      color: YELLOW,
      level: 'Practical',
      lessons: 4,
      time: '35 min',
      href: null,
    },
  ];

  const comingSoon = [
    { title: 'Reputation Management for CAM Firms', category: 'Marketing' },
    { title: 'Running a High-Trust Annual Meeting', category: 'Operations' },
    { title: 'Google Business Profile Mastery', category: 'Marketing' },
    { title: 'The Board Onboarding Experience', category: 'Retention' },
    { title: 'Writing HOA Newsletters That Get Read', category: 'Content' },
    { title: 'Setting the Right Expectations at Takeover', category: 'Operations' },
    { title: 'Using Data to Retain Associations', category: 'Strategy' },
    { title: 'Social Media for CAM: What Actually Works', category: 'Marketing' },
    { title: 'The Annual Report as a Retention Tool', category: 'Retention' },
  ];

  const metrics = [
    { value: '30–90', label: 'Minutes per course', color: PINK },
    { value: '100%', label: 'Free to start', color: YELLOW },
    { value: 'CAM', label: 'Industry-specific', color: GREEN },
    { value: 'Field', label: 'Tested frameworks', color: BLUE },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero bg-ivory">
        <div className="hero-bg-grid" />
        <div className="hero-inner">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)',
            gap: 64, alignItems: 'center',
          }}>
            {/* Left */}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 4,
              }}>
                <Eyebrow>Alloy Academy</Eyebrow>
                <CourseProgressControl />
              </div>
              <h1 className="display-xl" style={{ margin: '16px 0 22px', color: PURPLE }}>
                Free micro-courses for{' '}
                <span style={{ color: PINK }}>CAM operators.</span>
              </h1>
              <p className="lead" style={{ color: '#555', maxWidth: 600, marginBottom: 32 }}>
                Tight, practical, and built around field-tested frameworks. Each course is 30–90 minutes — designed for owners and operators who don't have an afternoon to spare.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="primary" arrow href="/courses/trust-building">
                  Start free course
                </Button>
                <Button variant="secondary" href="#courses">
                  Browse all courses
                </Button>
              </div>
            </div>
            {/* Right — featured card */}
            <FeaturedCard />
          </div>
        </div>
        {/* accent bar */}
        <div style={{ height: 6, display: 'flex' }}>
          {[PINK, YELLOW, BLUE, GREEN, PURPLE].map(c => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </section>

      {/* ── Metrics strip ─────────────────────────────────────────────────── */}
      <section style={{
        background: PURPLE, padding: '28px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0, textAlign: 'center',
          }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                padding: '12px 0',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 32, color: m.color, letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {m.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 11,
                  fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                  marginTop: 6,
                }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live courses ──────────────────────────────────────────────────── */}
      <section id="courses" className="section section-white">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <Eyebrow>Live courses</Eyebrow>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '12px 0 0' }}>
              Start learning today
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
          }}>
            {activeCourses.map(c => (
              <ActiveCourseCard key={c.title} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming soon grid ──────────────────────────────────────────────── */}
      <section className="section section-ivory">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <Eyebrow>In production</Eyebrow>
            <h2 className="display-lg" style={{ color: PURPLE, margin: '12px 0 8px' }}>
              More courses on the way
            </h2>
            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>
              We're building curriculum around every stage of the CAM growth cycle — from winning boards to keeping them.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}>
            {comingSoon.map(cs => (
              <ComingSoonCard key={cs.title} title={cs.title} category={cs.category} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Alloy Certified section ───────────────────────────────────────── */}
      <section className="section section-white">
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <Eyebrow noLine>Alloy Certified</Eyebrow>
          <h2 className="display-lg" style={{ color: PURPLE, margin: '14px auto 16px', maxWidth: 600 }}>
            Earn your badge. Show boards you've done the work.
          </h2>
          <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 40px' }}>
            Complete a course and pass the quiz to earn a shareable Alloy Certified badge — built for CAM owners who want to signal expertise without a brochure.
          </p>

          {/* Badge cluster */}
          <div style={{
            display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[
              { label: 'Board Trust', color: PINK },
              { label: 'AI Search', color: YELLOW },
              { label: 'Proposal Pro', color: GREEN },
              { label: 'Board Ed', color: BLUE },
            ].map(b => (
              <div key={b.label} style={{
                width: 100, height: 100,
                borderRadius: '50%',
                border: `4px solid ${b.color}`,
                background: `${b.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 4,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: PURPLE, textAlign: 'center', lineHeight: 1.2,
                  padding: '0 8px',
                }}>
                  {b.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: b.color,
                }}>
                  Alloy Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <CtaBand
        headline="Start with the trust course. It's free."
        sub="Six tight lessons plus a quiz. Designed for CAM owners and operators who want to lead with credibility — not just service delivery."
        primary="Start Building Trust"
        primaryHref="/courses/trust-building"
      />
    </>
  );
}
