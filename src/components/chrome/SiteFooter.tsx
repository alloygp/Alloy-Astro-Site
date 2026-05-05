// src/components/chrome/SiteFooter.tsx
// Site footer with brand block, link columns, newsletter signup, and bottom bar.
// Ported from _chrome.jsx → SiteFooter + FooterCol + NewsletterSignup.
import { useState } from 'react';
import AccentBar from '~/components/AccentBar';

export interface SiteFooterProps {
  animatedBar?: boolean;
}

export default function SiteFooter({ animatedBar = true }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <AccentBar height={8} animated={animatedBar} />
      <div className="site-footer-inner">
        <div>
          <img
            src="/assets/alloy-icon-1500.png"
            alt=""
            style={{
              width: 56,
              height: 56,
              background: '#fff',
              borderRadius: 10,
              padding: 6,
            }}
          />
          <div className="site-footer-tagline-eyebrow" style={{ marginTop: 22 }}>
            The Alloy promise
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 30,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 380,
            }}
          >
            Growth{' '}
            <span style={{ color: 'var(--alloy-pink)' }}>engineered</span>
            <br />
            exclusively for CAM.
          </div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 22, lineHeight: 1.7 }}>
            Austin, TX · Serving CAM companies nationwide
            <br />
            <a href="mailto:contact@alloygp.co">contact@alloygp.co</a> ·{' '}
            <a href="tel:+12108455989">210‑845‑5989</a>
            <br />
            BBB Accredited · CAI Member
          </div>
        </div>
        <FooterCol
          title="Services"
          items={[
            { label: 'CAM Marketing Services', href: '/hoa-cam-marketing-services' },
            { label: 'Property Management SEO', href: '/property-management-seo' },
            { label: 'HOA Board Education', href: '/hoa-board-education-programs' },
            { label: 'Groundwork — Fractional BD', href: '/groundwork' },
            { label: 'BoardSuite™', href: '/boardsuite' },
          ]}
        />
        <FooterCol
          title="The System"
          items={[
            { label: 'Our Approach', href: '/our-approach' },
            { label: 'BoardReach™ — Attract', href: '/our-approach/boardreach' },
            { label: 'BoardMatch™ — Close', href: '/our-approach/boardmatch' },
            { label: 'BoardRetain™ — Keep', href: '/our-approach/boardretain' },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: 'About', href: '/about' },
            { label: 'We-Know-CAM™', href: '/we-know-cam' },
            { label: 'Resource Hub', href: '/resource-hub' },
            { label: 'Results & Case Studies', href: '/results' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Courses', href: '/courses' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
        <NewsletterSignup />
      </div>
      <div className="site-footer-bottom">
        <div>© 2026 Alloy Growth Partners · Exclusively growing CAM companies</div>
        <div className="site-footer-bottom-links">
          <a href="/terms-conditions">Terms</a>
          <a href="/privacy-policy">Privacy</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

interface FooterColProps {
  title: string;
  items: { label: string; href: string }[];
}

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div>
      <div className="site-footer-col-title">{title}</div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.href}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Status = 'idle' | 'submitting' | 'ok' | 'err';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('err');
      setMsg('Enter a valid email address.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus('ok');
        setMsg("You're in. First Alloy briefing lands soon.");
        setEmail('');
      } else {
        setStatus('err');
        setMsg(json.error ?? 'Something went wrong. Try again?');
      }
    } catch {
      setStatus('err');
      setMsg("Couldn't reach the list. Try again in a moment.");
    }
  };

  const succeeded = status === 'ok';

  return (
    <div className="site-footer-newsletter">
      <div className="site-footer-newsletter-pitch">
        <div className="site-footer-tagline-eyebrow">The Alloy briefing</div>
        <h3>CAM growth, engineered — in your inbox.</h3>
        <p>
          Field-tested plays on attract, close, and keep. One short email, every other Tuesday. No
          fluff, no spam, unsubscribe anytime.
        </p>
      </div>

      {/* Crossfade container — form fades out, success panel fades in */}
      <div style={{ position: 'relative', minHeight: 52 }}>

        <form
          onSubmit={onSubmit}
          noValidate
          style={{
            transition: 'opacity 350ms ease, transform 350ms ease',
            opacity: succeeded ? 0 : 1,
            transform: succeeded ? 'translateY(-6px)' : 'translateY(0)',
            pointerEvents: succeeded ? 'none' : 'auto',
          }}
        >
          <input
            type="email"
            name="EMAIL"
            placeholder="you@yourcamcompany.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'err') setStatus('idle');
            }}
            aria-label="Email address"
            required
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{ transition: 'opacity 200ms ease', opacity: status === 'submitting' ? 0.55 : 1 }}
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>
          <div
            className="site-footer-newsletter-msg"
            style={{ color: status === 'err' ? '#ffb3c7' : 'var(--alloy-yellow)' }}
          >
            {msg}
          </div>
        </form>

        {/* Success panel */}
        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            transition: 'opacity 400ms ease 200ms, transform 400ms ease 200ms',
            opacity: succeeded ? 1 : 0,
            transform: succeeded ? 'translateY(0)' : 'translateY(6px)',
            pointerEvents: succeeded ? 'auto' : 'none',
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 36px',
            color: 'var(--alloy-yellow)',
            fontSize: 16,
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 3 }}>
              You're in.
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
              First Alloy briefing lands soon.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
