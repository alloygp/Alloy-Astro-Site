// src/components/pages/CourseTrustBuildingLessonPage.tsx
// Lesson view (Module 1, Lesson 2 — "Why trust signals matter to HOA boards")
import { useState } from 'react';

const ArrowLeft = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
);
const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
);

type LessonState = { check: string; status: 'pending' | 'active' | 'done' };

const initialLessons: LessonState[] = [
  { check: '✓', status: 'done' }, // L1
  { check: '2', status: 'active' }, // L2 (current)
  { check: '3', status: 'pending' },
  { check: '4', status: 'pending' },
  { check: '5', status: 'pending' },
  { check: '6', status: 'pending' },
  { check: '7', status: 'pending' },
  { check: '8', status: 'pending' },
  { check: '9', status: 'pending' },
  { check: '10', status: 'pending' },
  { check: '★', status: 'pending' },
];

export default function CourseTrustBuildingLessonPage() {
  const [lessons, setLessons] = useState<LessonState[]>(initialLessons);
  const [progress, setProgress] = useState({ count: 2, pct: 20 });

  const handleComplete = () => {
    setLessons((prev) => {
      const next = prev.map((l) => ({ ...l }));
      const activeIdx = next.findIndex((l) => l.status === 'active');
      if (activeIdx >= 0) {
        next[activeIdx].status = 'done';
        next[activeIdx].check = '✓';
        if (activeIdx + 1 < next.length) {
          next[activeIdx + 1].status = 'active';
        }
      }
      return next;
    });
    setProgress({ count: 3, pct: 30 });
  };

  const lessonRow = (idx: number, title: React.ReactNode, sub: string, href = '#') => {
    const l = lessons[idx];
    const cls = `lesson-row ${l.status === 'active' ? 'active' : ''} ${l.status === 'done' ? 'done' : ''}`.trim();
    return (
      <a className={cls} href={href} key={idx}>
        <div className="lesson-check">{l.check}</div>
        <div className="lesson-text">
          {title}
          <small>{sub}</small>
        </div>
      </a>
    );
  };

  return (
    <div className="course-page">
      <div className="shell">
        {/* Sidebar curriculum */}
        <aside className="sidebar">
         <div className="sidebar-inner">
          <div className="sidebar-head">
            <div className="sidebar-eyebrow">Building Trust</div>
            <div className="sidebar-title">Trust-Building for CAM Firms</div>
            <div className="sidebar-meta">10 lessons · 1 quiz · <strong>{progress.pct}% complete</strong></div>
          </div>

          <div className="module-block" style={{ ['--module-color' as never]: '#381c4f' }}>
            <div className="module-label">Module 1 · Introduction</div>
            {lessonRow(0, <>Intro to <em>Trust-Building for CAM Firms</em></>, '4 min · Lesson')}
            {lessonRow(1, <>Why trust signals matter to HOA boards</>, '6 min · Lesson')}
          </div>

          <div className="module-block" style={{ ['--module-color' as never]: '#d9356e' }}>
            <div className="module-label">Module 2 · Reviews</div>
            {lessonRow(2, <>What reviews are and why they carry weight</>, '7 min · Lesson')}
            {lessonRow(3, <>Reviews: extra factors that influence impact</>, '5 min · Lesson')}
          </div>

          <div className="module-block" style={{ ['--module-color' as never]: '#f5d880' }}>
            <div className="module-label">Module 3 · Testimonials</div>
            {lessonRow(4, <>What testimonials are and why they stand out</>, '6 min · Lesson')}
            {lessonRow(5, <>Testimonials: extra factors that influence impact</>, '5 min · Lesson')}
          </div>

          <div className="module-block" style={{ ['--module-color' as never]: '#aed7d0' }}>
            <div className="module-label">Module 4 · Case studies</div>
            {lessonRow(6, <>What case studies are and why they convince</>, '7 min · Lesson')}
            {lessonRow(7, <>Case studies: extra factors that influence impact</>, '6 min · Lesson')}
          </div>

          <div className="module-block" style={{ ['--module-color' as never]: '#381c4f' }}>
            <div className="module-label">Module 5 · Wrap-up</div>
            {lessonRow(8, <>Recapping the 3 trust signals</>, '4 min · Lesson')}
            {lessonRow(9, <>From proof to persuasion</>, '6 min · Lesson')}
            {lessonRow(10, <>Check your learning</>, '5 min · Quiz', '/courses/trust-building-quiz')}
          </div>
         </div>
        </aside>

        {/* Main content */}
        <main className="main">
          <div className="crumbs">
            <a href="/courses">Courses</a>
            <span className="sep">/</span>
            <a href="/courses/trust-building">Trust-Building for CAM Firms</a>
            <span className="sep">/</span>
            <span className="here">Module 1 · Lesson 2</span>
          </div>

          <div className="lesson-counter">Lesson 02 of 10</div>
          <h1 className="lesson-h1">Why trust signals matter to HOA boards</h1>

          <div className="lesson-meta">
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              6 minutes
            </span>
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              Video + transcript
            </span>
            <span className="lesson-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              Foundations
            </span>
          </div>

          {/* Video placeholder */}
          <div className="video">
            <button className="video-play" aria-label="Play lesson video">
              <svg width="32" height="32" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </button>
            <div className="video-caption">Lesson 2 · 6 min · Tap to play</div>
          </div>

          {/* Lesson body */}
          <div className="lesson-body">
            <p>Every CAM firm sells the same thing on paper: experienced managers, responsive service, fair pricing, the right software. By the time a board reaches the proposal stage, they've heard those four claims a dozen times. The thing that separates a firm that gets considered from a firm that gets <em>chosen</em> is proof — and not all proof is created equal.</p>

            <h2>Boards don't decide on features. They decide on confidence.</h2>
            <p>HOA board decisions are high-stakes and slow-moving. The community's finances, property values, and quality of life are riding on whether they pick the right partner. Most boards aren't in management — they're volunteers, evaluating something they don't do for a living. They lean heavily on signals from people they trust to <em>de-risk</em> the choice.</p>

            <div className="pull-quote">
              Boards don't pick the firm with the best pitch. They pick the firm whose proof feels least risky.
            </div>

            <p>That's why trust signals — reviews, testimonials, and case studies — sit at the center of every winning CAM marketing system. They aren't decoration on a website. They're the evidence boards reach for when they're trying to confirm what they already suspect: that you're the safer choice.</p>

            <h2>Three signals, three jobs</h2>
            <p>Each signal does a different job at a different stage of the board's journey:</p>

            <ul>
              <li><strong>Reviews</strong> — Volume and recency. Show the board you have an active, satisfied homeowner base. They check this <em>before</em> they reach out.</li>
              <li><strong>Testimonials</strong> — A specific board member or homeowner saying a specific thing. They check this <em>during</em> the consideration phase.</li>
              <li><strong>Case studies</strong> — A community like theirs, a problem like theirs, a measurable result. They check this <em>before</em> they vote.</li>
            </ul>

            <p>Showing the wrong signal at the wrong moment is the single most common mistake CAM firms make in their marketing. The rest of this course unpacks each signal, what makes it work, and the small things that double or halve its impact.</p>

            <div className="takeaways">
              <div className="takeaways-eyebrow">Key takeaways</div>
              <div className="takeaways-title">Before you move on —</div>
              <ul>
                <li>Boards default to the <strong>safer</strong> firm, not the better-pitched one.</li>
                <li>Reviews, testimonials, and case studies aren't interchangeable — each works at a specific stage of the board's decision.</li>
                <li>Showing the right proof at the right moment is what trust-building means in practice.</li>
              </ul>
            </div>

            <p>In the next module, we'll zero in on reviews — what makes them count for HOA boards, why volume matters more than perfect star averages, and the extra factors that change how much weight a board gives them.</p>
          </div>

          {/* Lesson footer / nav */}
          <div className="lesson-foot">
            <div className="complete-row">
              <button className="btn btn-primary" onClick={handleComplete}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Mark complete &amp; continue
              </button>
              <a href="#" className="btn btn-ghost">Skip for now →</a>
            </div>

            <div className="nav-row">
              <a className="nav-card" href="#">
                <div className="nav-card-label">
                  <ArrowLeft size={12} />
                  Previous lesson
                </div>
                <div className="nav-card-title">Intro to <em>Trust-Building for CAM Firms</em></div>
              </a>
              <a className="nav-card next" href="#">
                <div className="nav-card-label">
                  Next lesson · Module 2
                  <ArrowRight size={12} />
                </div>
                <div className="nav-card-title">What reviews are and why they carry weight</div>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
