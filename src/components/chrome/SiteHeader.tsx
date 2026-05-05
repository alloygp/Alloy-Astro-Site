// src/components/chrome/SiteHeader.tsx
// Hide-on-scroll-down / show-on-scroll-up header.
// Includes Services mega-menu (intro + 3-column by pillar), Approach mega-menu,
// Resources mega-menu, About mega-menu, and standard dropdowns.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Icon from '~/components/Icon';
import EngineLoop from '~/components/EngineLoop';
import { NAV } from '~/lib/nav';

// Small icon set used in the mega panels (Resources, About, Services).
// Inline SVGs so we have no additional bundle dependency.
function ResourceIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'library':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="4" height="16" rx="0.5" />
          <rect x="9" y="4" width="4" height="16" rx="0.5" />
          <path d="M16.5 5.2L20 6 17.5 19.8 14 19" />
        </svg>
      );
    case 'graduation':
      return (
        <svg {...props}>
          <path d="M2 9l10-5 10 5-10 5L2 9z" />
          <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
          <path d="M22 9v5" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <path d="M3 21V3" />
          <path d="M3 21h18" />
          <path d="M7 17V12" />
          <path d="M11 17V8" />
          <path d="M15 17v-7" />
          <path d="M19 17V6" />
        </svg>
      );
    case 'help':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.3 9.3a2.7 2.7 0 1 1 3.7 3.4c-0.7 0.4-1 1-1 1.7" />
          <circle cx="12" cy="17.2" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg {...props}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M14 8.5a4 4 0 0 1 0 7" />
          <path d="M17 6a7 7 0 0 1 0 12" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5" />
          <path d="M9 9.5a3 3 0 0 1 4 0" />
        </svg>
      );
    case 'handshake':
      return (
        <svg {...props}>
          <path d="M3 11l4-4 3 2 3-2 4 4-2 2-2-2-3 3-3-3z" />
          <path d="M14 13l3 3 3-3" />
          <path d="M4 13l3 3" />
        </svg>
      );
    case 'newsletter':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 9h18" />
          <path d="M7 13h7" />
          <path d="M7 16h5" />
          <path d="M16 13h2" />
          <path d="M16 16h2" />
        </svg>
      );
    case 'social':
      return (
        <svg {...props}>
          <circle cx="6" cy="7" r="2.5" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M8 8.5l3 6" />
          <path d="M16 8.5l-3 6" />
        </svg>
      );
    default:
      return null;
  }
}

export interface SiteHeaderProps {
  /**
   * Top-level nav id to highlight as the active page.
   * One of: services, boardsuite, approach, resources, about
   */
  active?: string;
  /**
   * Visual theme. 'light' (default) = white/translucent; 'purple' = purple-deep
   * background with white nav.
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

  // Close mega menu and mobile nav on Astro View Transitions page navigation.
  useEffect(() => {
    const onPageLoad = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener('astro:page-load', onPageLoad);
    return () => document.removeEventListener('astro:page-load', onPageLoad);
  }, []);

  // Close on Escape, on click outside header, or when cursor leaves both the
  // header band AND the open mega panel rect.
  const openMenuRef = useRef<string | null>(null);
  useEffect(() => {
    openMenuRef.current = openMenu;
  }, [openMenu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!openMenuRef.current) return;
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const header = t.closest('.site-header');
      const mega =
        t.closest('.nav-mega') ||
        t.closest('.nav-mega-services') ||
        t.closest('.nav-mega-resources') ||
        t.closest('.nav-mega-about');
      if (!header && !mega) setOpenMenu(null);
    };
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const onMove = (e: MouseEvent) => {
      if (!openMenuRef.current) return;
      const header = document.querySelector('.site-header');
      const mega = document.querySelector(
        '.nav-mega-services, .nav-mega, .nav-mega-resources, .nav-mega-about'
      );
      const x = e.clientX;
      const y = e.clientY;
      const inHeader =
        !!header &&
        (() => {
          const r = (header as HTMLElement).getBoundingClientRect();
          return x >= r.left && x <= r.right && y >= r.top - 4 && y <= r.bottom + 4;
        })();
      const inMega =
        !!mega &&
        (() => {
          const r = (mega as HTMLElement).getBoundingClientRect();
          return x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 12 && y <= r.bottom + 8;
        })();
      if (inHeader || inMega) {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      } else if (!closeTimer) {
        closeTimer = setTimeout(() => {
          closeTimer = null;
          if (openMenuRef.current) setOpenMenu(null);
        }, 120);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    document.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      document.removeEventListener('mousemove', onMove);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, []);

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
            const hasFlyout = !!(
              it.children ||
              it.megaServices ||
              it.megaResources ||
              it.megaAbout
            );
            const hasMega = !!(it.mega || it.megaServices || it.megaResources || it.megaAbout);
            return (
              <div
                key={it.id}
                className={`nav-item-wrap ${hasMega ? 'has-mega' : ''}`}
                onMouseEnter={() => setOpenMenu(hasFlyout ? it.id : null)}
              >
                <a
                  href={it.href}
                  className={`site-nav-link ${active === it.id ? 'active' : ''} ${openMenu === it.id ? 'is-open' : ''}`}
                  {...(hasFlyout ? { 'aria-haspopup': 'true' } : {})}
                  {...(openMenu === it.id ? { 'aria-expanded': 'true' } : {})}
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
                    // ── Services mega panel ──────────────────────────────────
                    <div className="nav-mega-services" role="menu">
                      <div className="nav-mega-services-inner">
                        <div className="nav-mega-services-intro">
                          <div className="nav-mega-services-eyebrow">Services</div>
                          <h3 className="nav-mega-services-headline">
                            Three engines.<br />One growth playbook.
                          </h3>
                          <p className="nav-mega-services-introsub">
                            Each service ladders into a connected system — built only for CAM
                            management companies.
                          </p>
                          <a href="/services" className="nav-mega-services-overview">
                            See all services →
                          </a>
                        </div>
                        <div className="nav-mega-services-groups">
                          {it.pillars.map((p) => (
                            <div key={p.pillar} className="nav-mega-services-group">
                              <a href={p.href} className="nav-mega-services-grouphead-link">
                                <span
                                  className="nav-mega-services-pillardot"
                                  style={{ background: p.color } as CSSProperties}
                                  aria-hidden="true"
                                />
                                <span className="nav-mega-services-grouphead-stack">
                                  <span
                                    className="nav-mega-services-stage"
                                    style={{ color: p.color } as CSSProperties}
                                  >
                                    {p.stageWord.toUpperCase()}
                                  </span>
                                  <span className="nav-mega-services-grouphead">
                                    {p.title}
                                  </span>
                                </span>
                              </a>
                              <div className="nav-mega-services-items">
                                {p.items.map((c) => (
                                  <a
                                    key={c.href}
                                    href={c.href}
                                    className="nav-mega-services-item"
                                    role="menuitem"
                                  >
                                    {c.icon ? (
                                      <span
                                        className="nav-mega-services-itemicon"
                                        style={
                                          {
                                            color: p.color,
                                            background: p.color + '1F',
                                          } as CSSProperties
                                        }
                                        aria-hidden="true"
                                      >
                                        <ResourceIcon name={c.icon} />
                                      </span>
                                    ) : (
                                      <span
                                        className="nav-mega-services-itemdot"
                                        style={{ background: p.color } as CSSProperties}
                                        aria-hidden="true"
                                      />
                                    )}
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
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : it.mega && it.children ? (
                    // ── Our Approach mega panel ──────────────────────────────
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
                              <EngineLoop
                                {...(c.pillar ? { pillar: c.pillar } : {})}
                                active={true}
                                size={44}
                              />
                            </div>
                            <div className="nav-mega-card-body">
                              <div className="nav-mega-card-head">
                                <span
                                  className="nav-mega-stage"
                                  style={{ color: c.color } as CSSProperties}
                                >
                                  {c.stageWord}
                                </span>
                              </div>
                              <div className="nav-mega-title">{c.label}</div>
                              <div className="nav-mega-sub-2">{c.subtitle}</div>
                            </div>
                            <div className="nav-mega-arrow" aria-hidden="true">→</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : it.megaResources && it.items ? (
                    // ── Resources mega panel ─────────────────────────────────
                    <div className="nav-mega-resources" role="menu">
                      <div className="nav-mega-resources-inner">
                        <div className="nav-mega-resources-grid">
                          <div className="nav-mega-resources-eyebrow">Resources</div>
                          <h3 className="nav-mega-resources-headline">
                            Sharper boards.<br />Faster CAM teams.
                          </h3>
                          <p className="nav-mega-resources-sub">
                            Frameworks, training, and proof points — built for the way community
                            management actually works.
                          </p>
                          <div className="nav-mega-resources-items">
                            {it.items.map((c) => (
                              <a
                                key={c.href}
                                href={c.href}
                                className="nav-mega-resources-item"
                                role="menuitem"
                              >
                                <span className="nav-mega-resources-itemicon" aria-hidden="true">
                                  {c.icon && <ResourceIcon name={c.icon} />}
                                </span>
                                <div className="nav-mega-resources-item-body">
                                  <div className="nav-mega-resources-item-title">{c.label}</div>
                                  <div className="nav-mega-resources-item-sub">{c.subtitle}</div>
                                </div>
                                <span className="nav-mega-resources-itemarrow" aria-hidden="true">
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                        {it.feature && (
                          <a
                            href={it.feature.href}
                            className="nav-mega-resources-feature"
                            role="menuitem"
                            style={
                              {
                                '--feature-bg': 'url(/assets/trust-building-fistbump.webp)',
                              } as CSSProperties
                            }
                          >
                            <div className="nav-mega-resources-feature-eyebrow">
                              {it.feature.eyebrow}
                            </div>
                            <div className="nav-mega-resources-feature-titlewrap">
                              <h4 className="nav-mega-resources-feature-title">
                                {it.feature.title}
                              </h4>
                            </div>
                            <p className="nav-mega-resources-feature-sub">{it.feature.sub}</p>
                            <div className="nav-mega-resources-feature-tag">{it.feature.tag}</div>
                            <span className="nav-mega-resources-feature-cta">
                              {it.feature.cta} →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : it.megaAbout && it.items ? (
                    // ── About mega panel ─────────────────────────────────────
                    <div className="nav-mega-about" role="menu">
                      <div className="nav-mega-about-inner">
                        <div className="nav-mega-about-grid">
                          <div className="nav-mega-about-eyebrow">About Alloy</div>
                          <h3 className="nav-mega-about-headline">
                            Operators who built<br />the playbook.
                          </h3>
                          <p className="nav-mega-about-sub">
                            We grew CAM portfolios before we built the agency. Every page on this
                            site is something we&apos;d want as an operator.
                          </p>
                          <div className="nav-mega-about-items">
                            {it.items.map((c) => (
                              <a
                                key={c.href}
                                href={c.href}
                                className="nav-mega-about-item"
                                role="menuitem"
                              >
                                <span className="nav-mega-about-itemicon" aria-hidden="true">
                                  {c.icon && <ResourceIcon name={c.icon} />}
                                </span>
                                <div className="nav-mega-about-item-body">
                                  <div className="nav-mega-about-item-title">{c.label}</div>
                                  <div className="nav-mega-about-item-sub">{c.subtitle}</div>
                                </div>
                                <span className="nav-mega-about-itemarrow" aria-hidden="true">
                                  →
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                        {it.feature && (
                          <a
                            href={it.feature.href}
                            className="nav-mega-about-feature"
                            role="menuitem"
                          >
                            <div className="nav-mega-about-feature-eyebrow">
                              {it.feature.eyebrow}
                            </div>
                            <div
                              className="nav-mega-about-feature-stars"
                              aria-label="5 out of 5 stars"
                            >
                              <span aria-hidden="true">★★★★★</span>
                            </div>
                            <div
                              className="nav-mega-about-feature-quotemark"
                              aria-hidden="true"
                            >
                              &ldquo;
                            </div>
                            <p className="nav-mega-about-feature-quote">{it.feature.quote}</p>
                            <div className="nav-mega-about-feature-attrib">
                              <div className="nav-mega-about-feature-name">{it.feature.name}</div>
                              <div className="nav-mega-about-feature-role">{it.feature.role}</div>
                            </div>
                            <span className="nav-mega-about-feature-cta">
                              {it.feature.cta} →
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : it.children ? (
                    // ── Plain dropdown (fallback) ─────────────────────────────
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
          <a href="/strategic-review-request" className="btn btn-primary btn-sm btn-arrow">
            Claim Your Market
          </a>
          <a
            href="/login"
            className="site-header-login"
            aria-label="Log in to your Alloy account"
          >
            <img
              src="/assets/alloy-icon-1500.png"
              alt=""
              className="site-header-login-icon"
            />
            <span>Log in</span>
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
          {NAV.map((it) => {
            const mobileChildren =
              it.megaServices && it.pillars
                ? it.pillars.flatMap((p) => [
                    { label: p.title, href: p.href, isPillar: true, isNew: false },
                    ...p.items.map((c) => ({ ...c, isPillar: false })),
                  ])
                : it.megaResources || it.megaAbout
                ? (it.items ?? []).map((c) => ({ ...c, isPillar: false, isNew: false }))
                : it.children
                ? it.children.map((c) => ({ ...c, isPillar: false }))
                : null;
            return (
              <div key={it.id} className="mobile-section">
                <a href={it.href} className="mobile-section-title">
                  {it.label}
                </a>
                {mobileChildren && (
                  <div className="mobile-children">
                    {mobileChildren.map((c, i) => (
                      <a
                        key={c.href + i}
                        href={c.href}
                        className={c.isPillar ? 'mobile-child-pillar' : ''}
                      >
                        {c.label}
                        {c.isNew && <span className="mobile-child-new">New</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <a href="/strategic-review-request" className="btn btn-primary mobile-cta">
            Claim Your Market
          </a>
          <a href="/login" className="mobile-login-link">
            Log in to your account →
          </a>
        </div>
      )}
    </header>
  );
}
