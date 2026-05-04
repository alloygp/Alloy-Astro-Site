// src/components/chrome/SiteHeader.tsx
// Hide-on-scroll-down / show-on-scroll-up header.
// Ported from _chrome.jsx → SiteHeader.
import { useEffect, useRef, useState } from 'react';
import Icon from '~/components/Icon';
import EngineLoop from '~/components/EngineLoop';
import { NAV } from '~/lib/nav';

export interface SiteHeaderProps {
  /**
   * Top-level nav id to highlight as the active page.
   * One of: services, boardsuite, approach, resources, about
   */
  active?: string;
  /**
   * Visual theme. 'light' (default) = white/translucent; 'purple' = purple-deep
   * background with white nav (used on dense interior pages where the page
   * starts with a light hero and we want a stronger header anchor).
   */
  theme?: 'light' | 'purple';
}

export default function SiteHeader({ active, theme = 'light' }: SiteHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // hide when scrolling down past threshold; show when scrolling up
      if (y > 120 && y > lastY.current) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`site-header site-header--${theme} ${hidden ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="site-header-inner">
        <a className="site-logo" href="/">
          <img src="/assets/alloy-logo-full-color.svg" alt="Alloy Growth Partners" />
        </a>

        <nav className="site-nav-desktop" aria-label="Primary">
          {NAV.map((it) => (
            <div
              key={it.id}
              className="nav-item-wrap"
              onMouseEnter={() => setOpenMenu(it.children ? it.id : null)}
            >
              <a
                href={it.href}
                className={`site-nav-link ${active === it.id ? 'active' : ''} ${openMenu === it.id ? 'is-open' : ''}`}
                aria-haspopup={it.children ? 'true' : undefined}
                aria-expanded={openMenu === it.id ? 'true' : undefined}
              >
                {it.label}
                {it.children && (
                  <svg
                    className="caret"
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L5.5 5.5L10 1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </a>
              {it.children && openMenu === it.id && (
                it.mega ? (
                  <div className="nav-mega" role="menu" onMouseLeave={() => setOpenMenu(null)}>
                    <div className="nav-mega-intro">
                      <div className="nav-mega-eyebrow">The Alloy System</div>
                      <h3 className="nav-mega-headline">
                        Three engines.
                        <br />
                        One playbook.
                      </h3>
                      <p className="nav-mega-sub">
                        Attract, close, and keep — engineered as one connected system, not three
                        disconnected agencies.
                      </p>
                      <a href="/our-approach" className="nav-mega-overview">
                        See the whole system →
                      </a>
                    </div>
                    <div className="nav-mega-cards">
                      {it.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          className="nav-mega-card"
                          role="menuitem"
                        >
                          <div className="nav-mega-card-icon">
                            <EngineLoop pillar={c.pillar} active={true} size={44} />
                          </div>
                          <div className="nav-mega-card-body">
                            <div className="nav-mega-card-head">
                              <span
                                className="nav-mega-stage"
                                style={{ color: c.color }}
                              >
                                {c.stageWord}
                              </span>
                            </div>
                            <div className="nav-mega-title">{c.label}</div>
                            <div className="nav-mega-sub-2">{c.subtitle}</div>
                          </div>
                          <div className="nav-mega-arrow" aria-hidden="true">
                            →
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="nav-dropdown" role="menu">
                    {it.children.map((c) => (
                      <a
                        key={c.href}
                        href={c.href}
                        role="menuitem"
                        className="nav-dropdown-item"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </nav>

        <div className="site-header-cta">
          <a
            href="/strategic-review-request"
            className="btn btn-primary btn-sm btn-arrow"
          >
            Claim Your Market
          </a>
        </div>

        <button
          className="site-header-burger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} size={22} strokeWidth={2} />
        </button>
      </div>

      {mobileOpen && (
        <div className="site-nav-mobile">
          {NAV.map((it) => (
            <div key={it.id} className="mobile-section">
              <a href={it.href} className="mobile-section-title">
                {it.label}
              </a>
              {it.children && (
                <div className="mobile-children">
                  {it.children.map((c) => (
                    <a key={c.href} href={c.href}>
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="/strategic-review-request" className="btn btn-primary mobile-cta">
            Claim Your Market
          </a>
        </div>
      )}
    </header>
  );
}
