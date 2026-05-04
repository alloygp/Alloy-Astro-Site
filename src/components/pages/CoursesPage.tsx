// src/components/pages/CoursesPage.tsx
import Button from '~/components/Button';
import { PageHero, CtaBand } from '~/components/sections/Shells';
import { PURPLE, PINK, YELLOW, GREEN, BLUE } from '~/lib/tokens';

interface Course {
  title: string;
  color: string;
  lessons: number;
  time: string;
  level: string;
  featured?: boolean;
  desc: string;
}

export default function CoursesPage() {
  const courses: Course[] = [
    { title: 'Outsmarting AI Search', color: YELLOW, lessons: 5, time: '45 min', level: 'Foundations', featured: true, desc: 'From AI-search fundamentals to citation strategy. Built for CAM operators who want to be the answer ChatGPT cites.' },
    { title: 'Proposal Anatomy That Wins', color: PINK, lessons: 7, time: '75 min', level: 'Intermediate', desc: 'The 7-section RFP framework that flips your win rate. Templates, narrative builds, and pricing presentation.' },
    { title: 'Build a Board Education Engine', color: GREEN, lessons: 6, time: '60 min', level: 'Foundations', desc: 'How to launch a branded learning library that boards return to — and how to use it as a retention engine.' },
    { title: 'The Manager-Transition Playbook', color: BLUE, lessons: 4, time: '35 min', level: 'Practical', desc: 'Reduce manager-turnover-driven churn with a transition checklist, comms cadence, and 90-day plan.' },
  ];
  return (
    <>
      <PageHero
        eyebrow="Courses"
        h1={<>Free and premium micro-courses<br/>for <span style={{ color: PINK }}>CAM operators.</span></>}
        sub="Tight, practical, and built around field-tested frameworks. Each course is 30–90 minutes total — designed for owners and operators who don't have an afternoon to spare."
      />
      <section className="section section-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {courses.map(c => (
              <div key={c.title} className="card card-pad" style={{
                display: 'flex', flexDirection: 'column', gap: 14,
                borderTop: `5px solid ${c.color}`,
                position: 'relative',
              }}>
                {c.featured && <div style={{ position: 'absolute', top: 16, right: 20, background: c.color, color: PURPLE, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999 }}>Free</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#888' }}>
                  <span>{c.level}</span>
                  <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }}></span>
                  <span>{c.lessons} lessons</span>
                  <span style={{ width: 3, height: 3, background: '#bbb', borderRadius: 999 }}></span>
                  <span>{c.time}</span>
                </div>
                <div className="display-md" style={{ fontSize: 26, color: PURPLE, lineHeight: 1.15 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{c.desc}</div>
                <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                  <Button variant="ghost" arrow size="sm" href="/strategic-review-request">Start the course</Button>
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
