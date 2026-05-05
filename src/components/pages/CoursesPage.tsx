// src/components/pages/CoursesPage.tsx
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

interface Course {
  num: string;
  title: string;
  color: string;
  colorRgb: string; // for rgba usage
  lessons: number;
  time: string;
  level: string;
  featured?: boolean;
  available?: boolean;
  href?: string;
  desc: string;
}

interface BadgeProps { text: string; color: string; textColor: string; }

// Decorative thumbnail panel — abstract geometry in course color
function CourseThumbnail({ color, colorRgb, num, badge }: { color: string; colorRgb: string; num: string; badge?: BadgeProps }) {
  return (
    <div style={{
      width: 172,
      flexShrink: 0,
      background: `linear-gradient(145deg, rgba(${colorRgb},0.12) 0%, rgba(${colorRgb},0.38) 100%)`,
      borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Large faded course number */}
      <div style={{
        position: 'absolute',
        bottom: -12,
        left: -4,
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 96,
        lineHeight: 1,
        color: `rgba(${colorRgb},0.18)`,
        userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>{num}</div>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', border: `1.5px solid rgba(${colorRgb},0.30)`, top: -28, right: -28 }} />
      <div style={{ position: 'absolute', width: 64, height: 64, borderRadius: '50%', background: `rgba(${colorRgb},0.14)`, top: 18, right: 18 }} />
      <div style={{ position: 'absolute', width: 40, height: 40, borderRadius: '50%', border: `1.5px solid rgba(${colorRgb},0.22)`, bottom: 24, right: 40 }} />
      {/* Center dot */}
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.6, position: 'relative', zIndex: 1 }} />
      {/* Floating badge at bottom */}
      {badge && (
        <span style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: badge.color,
          color: badge.textColor,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 9,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '3px 9px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          zIndex: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
        }}>
          {badge.text}
        </span>
      )}
    </div>
  );
}

const DOT = <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999, display: 'inline-block', verticalAlign: 'middle' }} />;

export default function CoursesPage() {
  const courses: Course[] = [
    {
      num: '01',
      title: 'Building Trust as a CAM',
      color: PINK,
      colorRgb: '217,53,110',
      lessons: 10,
      time: '~60 min',
      level: 'Foundations',
      featured: true,
      available: true,
      href: '/courses/trust-building',
      desc: "Why trust — not service quality — decides which CAM firms boards renew, refer, and rave about. Reviews, testimonials, and case studies: what each one does and when to use it.",
    },
    {
      num: '02',
      title: 'Outsmarting AI Search',
      color: YELLOW,
      colorRgb: '245,216,128',
      lessons: 5,
      time: '~45 min',
      level: 'Foundations',
      desc: 'From AI-search fundamentals to citation strategy. Built for CAM operators who want to be the answer ChatGPT cites.',
    },
    {
      num: '03',
      title: 'Proposal Anatomy That Wins',
      color: GREEN,
      colorRgb: '174,215,208',
      lessons: 7,
      time: '~75 min',
      level: 'Intermediate',
      desc: 'The 7-section RFP framework that flips your win rate. Templates, narrative builds, and pricing presentation.',
    },
    {
      num: '04',
      title: 'Build a Board Education Engine',
      color: BLUE,
      colorRgb: '161,200,231',
      lessons: 6,
      time: '~60 min',
      level: 'Foundations',
      desc: 'How to launch a branded learning library that boards return to — and how to use it as a retention engine.',
    },
    {
      num: '05',
      title: 'The Manager-Transition Playbook',
      color: YELLOW,
      colorRgb: '245,216,128',
      lessons: 4,
      time: '~35 min',
      level: 'Practical',
      desc: 'Reduce manager-turnover-driven churn with a transition checklist, comms cadence, and 90-day plan.',
    },
  ];

  const stats = [
    {
      value: '≤10 min',
      label: 'Per lesson',
      desc: 'Every lesson is timed and dense. No filler, no padding, no recap slides.',
    },
    {
      value: '$0',
      label: 'Always free',
      desc: 'No card, no upsell, no drip email sequences. Just the course.',
    },
    {
      value: '100%',
      label: 'Field-tested',
      desc: 'Every framework runs inside paid client engagements before it ships here.',
    },
  ];

  const featuredCard = (
    <a href="/courses/trust-building" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      {/* Top accent bar in pink */}
      <div style={{ height: 3, background: PINK, borderRadius: '3px 3px 0 0', margin: '-32px -32px 24px' }} />

      {/* Badge + number row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{
          background: PINK,
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '4px 10px',
          borderRadius: 999,
        }}>
          Live now
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 42,
          color: 'rgba(255,255,255,0.08)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}>01</span>
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 20,
        lineHeight: 1.2,
        color: '#fff',
        marginBottom: 10,
        letterSpacing: '-0.01em',
      }}>
        Building Trust as a CAM
      </div>

      {/* Desc */}
      <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: '0 0 20px' }}>
        Reviews, testimonials, and case studies — what each signal does and exactly when boards rely on it.
      </p>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: 16,
        borderTop: '1px solid rgba(255,255,255,0.10)',
        paddingTop: 16,
        marginBottom: 18,
      }}>
        {[['10', 'lessons'], ['~60', 'min'], ['Free', 'always']].map(([val, lab]) => (
          <div key={lab}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff', lineHeight: 1 }}>{val}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{lab}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 13,
        color: PINK,
        letterSpacing: '0.02em',
      }}>
        Start the course →
      </div>
    </a>
  );

  return (
    <>
      <PageHero
        dark
        eyebrow="Courses"
        h1={<>Free micro-courses<br />for <span style={{ color: PINK }}>CAM operators.</span></>}
        sub="Tight, practical, and built around field-tested frameworks. Each course is 30–90 minutes total — designed for owners and operators who don't have an afternoon to spare."
        sideStat={featuredCard}
      />

      {/* Course grid */}
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {courses.map(c => {
              const isAvailable = c.available === true && !!c.href;
              const CardEl = isAvailable ? 'a' : 'div';
              const cardProps = isAvailable
                ? { href: c.href, style: { textDecoration: 'none', color: 'inherit', cursor: 'pointer' } as React.CSSProperties }
                : { style: {} as React.CSSProperties };

              const badge: BadgeProps | undefined = c.featured
                ? { text: 'Live now', color: c.color, textColor: c.color === YELLOW ? '#6b4c00' : '#fff' }
                : !isAvailable
                  ? { text: 'Coming soon', color: '#e8e8e8', textColor: '#888' }
                  : undefined;

              return (
                <CardEl
                  key={c.title}
                  {...(cardProps as any)}
                  className="card"
                  style={{
                    ...cardProps.style,
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    opacity: !isAvailable ? 0.72 : 1,
                    minHeight: 180,
                  }}
                >
                  <CourseThumbnail color={c.color} colorRgb={c.colorRgb} num={c.num} {...(badge ? { badge } : {})} />

                  <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 26px', gap: 10, flex: 1, minWidth: 0 }}>
                    {/* Meta row — full width, no badge competing for space */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', fontWeight: 700, color: '#999', whiteSpace: 'nowrap' }}>
                      <span>{c.level}</span>
                      {DOT}
                      <span>{c.lessons} lessons</span>
                      {DOT}
                      <span>{c.time}</span>
                    </div>

                    {/* Title */}
                    <div className="display-md" style={{ fontSize: 22, color: PURPLE, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {c.title}
                    </div>

                    {/* Description */}
                    <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6, flex: 1 }}>{c.desc}</div>

                    {/* CTA */}
                    {isAvailable && (
                      <div style={{ paddingTop: 4 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: c.color, letterSpacing: '0.01em' }}>
                          Start the course →
                        </span>
                      </div>
                    )}
                  </div>
                </CardEl>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authority section */}
      <section className="section" style={{ background: PURPLE, color: '#fff' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: YELLOW,
              marginBottom: 18,
            }}>
              Not theory. Not fluff.
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.2vw, 38px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#fff',
              margin: '0 0 20px',
            }}>
              The same frameworks we run inside paid engagements — distilled and sequenced for operators with a full calendar.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', margin: 0 }}>
              Every course here was reverse-engineered from what actually moves the needle in real CAM contracts and renewals. If it doesn't help you win business or keep communities, it doesn't ship.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: i === 0 ? '12px 0 0 12px' : i === stats.length - 1 ? '0 12px 12px 0' : 0,
                padding: '32px 28px',
                textAlign: 'center',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 40,
                  letterSpacing: '-0.03em',
                  color: YELLOW,
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: 10,
                }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.60)', lineHeight: 1.55 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
