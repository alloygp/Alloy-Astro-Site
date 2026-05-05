// src/components/chrome/SiteHeader.tsx
// Hide-on-scroll-down / show-on-scroll-up header.
// Includes Services mega-menu (3-column by pillar), Approach mega-menu,
// and standard dropdowns.
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

  // Close on Escape, on click outside header, or when mouse leaves header DOM tree.
  // (We can't use header onMouseLeave because the mega panels are positioned
  //  visually outside the header rect, so they fire mouseleave on the parent.)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onDocMove = (e: MouseEvent) => {
      if (!openMenu) return;
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (!t.closest('.site-header')) setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!openMenu) return;
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (!t.closest('.site-header')) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousemove', onDocMove);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousemove', onDocMove);
      document.removeEventListener('click', onClick);
    };
  }, [openMenu]);

  return (
    <header
      className={`site-header site-header--${theme} ${hidden ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="site-header-inner">
        <a className="site-logo" href="/">
          <img src="/assets/alloy-logo-full-color.svg" alt="Alloy Growth Partners" />
        </a>

        <nav className="site-nav-desktop" aria-label="Primary">
          {NAV.map((it) => {
            const hasFlyout = !!(it.children || it.megaServices);
            return (
              <div
                key={it.id}
                className={`nav-item-wrap ${it.mega || it.megaServices ? 'has-mega' : ''}`}
                onMouseEnter={() => setOpenMenu(hasFlyout ? it.id : null)}
              >
                <a
                  href={it.href}
                  className={`site-nav-link ${active === it.id ? 'active' : ''} ${openMenu === it.id ? 'is-open' : ''}`}
                  aria-haspopup={hasFlyout ? 'true' : undefined}
                  aria-expanded={openMenu === it.id ? 'true' : undefined}
                >
                  {it.label}
                  {hasFlyout && (
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
                {hasFlyout && openMenu === it.id && (
                  it.megaServices && it.pillars ? (
                    <div className="nav-mega-services" role="menu">
                      <div className="nav-mega-intro">
                        <div className="nav-mega-eyebrow">Services</div>
                        <h3 className="nav-mega-headline">
                          The full
                          <br />
                          board lifecycle.
                        </h3>
                        <p className="nav-mega-sub">
                          Engineered services for every stage — attract, close, and keep.
                          Every service maps to one of the three engines.
                        </p>
                        <a href="/services" className="nav-mega-overview">
                          See all services →
                        </a>
                      </div>
                      <div className="nav-mega-services-groups">
                        {it.pillars.map((p) => (
                          <div key={p.pillar} className="nav-mega-services-group">
                            <a
                              href={p.href}
                              className="nav-mega-services-grouphead"
                              style={{ color: p.color }}
                            >
                              {p.title}
                            </a>
                            <div className="nav-mega-services-items">
                              {p.items.map((c) => (
                                <a
                                  key={c.href}
                                  href={c.href}
                                  className="nav-mega-services-item"
                                  role="menuitem"
                                >
                                  <div className="nav-mega-services-item-body">
                                    <div className="nav-mega-services-item-head">
                                      <span className="nav-mega-services-item-title">
                                        {c.label}
                                      </span>
                                      {c.isNew && (
                                        <span className="nav-mega-services-new">New</span>
                                      )}
                                    </div>
                                    {c.subtitle && (
                                      <div className="nav-mega-services-item-sub">
                                        {c.subtitle}
                                      </div>
                                    )}
                                  </div>
                                  <div className="nav-mega-arrow" aria-hidden="true">
                                    →
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : it.mega && it.children ? (
                    <div className="nav-mega" role="menu">
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
                  ) : it.children ? (
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
                  ) : null
                )}
              </div>
            );
          })}
        </nav>

        <div className="site-header-cta">
          <a href="/login" className="btn-login">
            <img src="/assets/alloy-icon-1500.png" alt="" aria-hidden="true" />
            Log In
          </a>
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
              {it.megaServices && it.pillars ? (
                <div className="mobile-children">
                  {it.pillars.map((p) => (
                    <div key={p.pillar} className="mobile-pillar-group">
                      <div
                        className="mobile-pillar-label"
                        style={{ color: p.color }}
                      >
                        {p.stageWord} — {p.title}
                      </div>
                      {p.items.map((c) => (
                        <a key={c.href} href={c.href} className="mobile-child-pillar">
                          {c.label}
                          {c.isNew && <span className="mobile-child-new">New</span>}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              ) : it.children ? (
                <div className="mobile-children">
                  {it.children.map((c) => (
                    <a key={c.href} href={c.href}>
                      {c.label}
                    </a>
                  ))}
                </div>
              ) : null}
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
