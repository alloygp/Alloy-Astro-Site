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

// Newsletter signup — Mailchimp embedded form (JSONP, no redirect).
// To wire up: replace MAILCHIMP_ACTION + MAILCHIMP_HONEYPOT_NAME with the
// real values from your Mailchimp audience's embedded form code.
const MAILCHIMP_ACTION =
  'https://alloygp.us21.list-manage.com/subscribe/post?u=REPLACE_USER_ID&id=REPLACE_LIST_ID&f_id=REPLACE_F_ID';
const MAILCHIMP_HONEYPOT_NAME = 'b_REPLACE_USER_ID_REPLACE_LIST_ID';

type Status = 'idle' | 'submitting' | 'ok' | 'err';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus('err');
      setMsg('Enter a valid email address.');
      return;
    }
    setStatus('submitting');
    const cbName = 'alloyMcCb_' + Date.now();
    const url =
      MAILCHIMP_ACTION.replace('/post?', '/post-json?') +
      '&EMAIL=' +
      encodeURIComponent(email) +
      '&' +
      MAILCHIMP_HONEYPOT_NAME +
      '=&c=' +
      cbName;
    const w = window as unknown as Record<string, (resp: { result?: string; msg?: string }) => void>;
    let script: HTMLScriptElement | null = null;
    w[cbName] = (resp) => {
      if (resp && resp.result === 'success') {
        setStatus('ok');
        setMsg("You're in. First Alloy briefing lands soon.");
        setEmail('');
      } else {
        setStatus('err');
        setMsg(
          resp && resp.msg
            ? String(resp.msg).replace(/<[^>]+>/g, '')
            : 'Something went wrong. Try again?',
        );
      }
      delete w[cbName];
      script?.remove();
    };
    script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      setStatus('err');
      setMsg("Couldn't reach the list. Try again in a moment.");
      delete w[cbName];
      script?.remove();
    };
    document.body.appendChild(script);
  };

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
      <form onSubmit={onSubmit} noValidate>
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
        {/* Mailchimp honeypot */}
        <div style={{ position: 'absolute', left: -5000 }} aria-hidden="true">
          <input type="text" name={MAILCHIMP_HONEYPOT_NAME} tabIndex={-1} defaultValue="" />
        </div>
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting'
            ? 'Subscribing…'
            : status === 'ok'
              ? 'Subscribed ✓'
              : 'Subscribe'}
        </button>
        <div
          className="site-footer-newsletter-msg"
          style={{ color: status === 'err' ? '#ffb3c7' : 'var(--alloy-yellow)' }}
        >
          {msg}
        </div>
      </form>
    </div>
  );
}
