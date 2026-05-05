// src/lib/nav.ts
// Site navigation config — used by the header, mobile menu, mega menu,
// and (eventually) the footer columns. One source of truth.

export interface NavChild {
  label: string;
  href: string;
  subtitle?: string;
  color?: string;
  pillar?: 'reach' | 'match' | 'retain';
  stageWord?: string;
  isNew?: boolean;
}

export interface NavPillarItem {
  label: string;
  href: string;
  subtitle?: string;
  isNew?: boolean;
  icon?: string;
}

export interface NavPillar {
  pillar: 'reach' | 'match' | 'retain';
  stageWord: string;
  color: string;
  title: string;
  sub: string;
  href: string;
  items: NavPillarItem[];
}

/** Items used in Resources and About mega panels */
export interface NavMegaItem {
  label: string;
  href: string;
  subtitle?: string;
  icon?: string;
}

/** Feature card that appears on the right side of Resources / About mega panels */
export interface NavFeature {
  eyebrow: string;
  href: string;
  cta: string;
  tag?: string;
  // Course / resource card fields
  title?: string;
  sub?: string;
  // Operator review card fields
  quote?: string;
  name?: string;
  role?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  /** Our Approach mega panel (EngineLoop cards) */
  mega?: boolean;
  /** Services mega panel (3-pillar columns) */
  megaServices?: boolean;
  /** Resources mega panel (icon items + feature card) */
  megaResources?: boolean;
  /** About mega panel (icon items + quote card) */
  megaAbout?: boolean;
  /** Pillar columns for megaServices */
  pillars?: NavPillar[];
  /** Children for mega (Our Approach) or plain dropdown */
  children?: NavChild[];
  /** Items for megaResources / megaAbout left column */
  items?: NavMegaItem[];
  /** Feature card for megaResources / megaAbout right column */
  feature?: NavFeature;
}

export const NAV: NavItem[] = [
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    megaServices: true,
    pillars: [
      {
        stageWord: 'Attract',
        pillar: 'reach',
        color: '#ED1968',
        title: 'BoardReach™',
        sub: 'Get found before boards start shopping.',
        href: '/our-approach/boardreach',
        items: [
          {
            label: 'CAM Marketing Services',
            href: '/hoa-cam-marketing-services',
            subtitle: 'Full-funnel marketing built for HOA management',
            icon: 'megaphone',
          },
          {
            label: 'CAM SEO & AI Search',
            href: '/property-management-seo',
            subtitle: 'Rank where boards search — Google and ChatGPT',
            icon: 'search',
          },
          {
            label: 'Social Media Marketing',
            href: '/services/social-media-marketing-for-hoa-management-companies',
            subtitle: 'Stay visible where boards scroll every day',
            icon: 'social',
          },
          {
            label: 'HOA Website Design',
            href: '/boardreach/hoa-website-design/',
            subtitle: 'Convert visitors into inbound board inquiries',
            isNew: true,
            icon: 'layout',
          },
        ],
      },
      {
        stageWord: 'Close',
        pillar: 'match',
        color: '#FFCC33',
        title: 'BoardMatch™',
        sub: 'Turn conversations into signed contracts.',
        href: '/our-approach/boardmatch',
        items: [
          {
            label: 'Groundwork — Fractional BD',
            href: '/groundwork',
            subtitle: 'Senior BD muscle without the senior BD salary',
            icon: 'handshake',
          },
          {
            label: 'Proposal Optimization',
            href: '/boardmatch/proposal-optimization/',
            subtitle: 'Proposals that close the room, not just inform it',
            isNew: true,
            icon: 'file-sig',
          },
          {
            label: 'RFP Response System',
            href: '/boardmatch/rfp-response-system/',
            subtitle: 'Win more RFPs with a repeatable response system',
            isNew: true,
            icon: 'archive',
          },
          {
            label: 'Sales Messaging',
            href: '/boardmatch/sales-messaging/',
            subtitle: 'The words that separate you from every other firm',
            isNew: true,
            icon: 'feather',
          },
        ],
      },
      {
        stageWord: 'Keep',
        pillar: 'retain',
        color: '#4FC2B5',
        title: 'BoardRetain™',
        sub: 'Make boards never want to leave.',
        href: '/our-approach/boardretain',
        items: [
          {
            label: 'HOA Board Education Programs',
            href: '/hoa-board-education-programs',
            subtitle: 'Educate boards so they renew with confidence',
            icon: 'graduation',
          },
          {
            label: 'Newsletter Production',
            href: '/services/hoa-newsletter-production',
            subtitle: 'Done-for-you newsletters boards actually read',
            icon: 'newsletter',
          },
          {
            label: 'Reputation Management',
            href: '/boardretain/reputation-management/',
            subtitle: 'Protect and build your firm\'s online reputation',
            isNew: true,
            icon: 'shield',
          },
          {
            label: 'Thought Leadership',
            href: '/boardretain/thought-leadership/',
            subtitle: 'Position your firm as the definitive CAM authority',
            isNew: true,
            icon: 'edit',
          },
        ],
      },
    ],
  },
  {
    id: 'boardsuite',
    label: 'BoardSuite™',
    href: '/boardsuite',
  },
  {
    id: 'approach',
    label: 'Our Approach',
    href: '/our-approach',
    mega: true,
    children: [
      {
        label: 'BoardReach™',
        subtitle: 'Attract — get found before boards start shopping',
        href: '/our-approach/boardreach',
        color: '#ED1968',
        pillar: 'reach',
        stageWord: 'Attract',
      },
      {
        label: 'BoardMatch™',
        subtitle: 'Close — turn conversations into signed contracts',
        href: '/our-approach/boardmatch',
        color: '#FFCC33',
        pillar: 'match',
        stageWord: 'Close',
      },
      {
        label: 'BoardRetain™',
        subtitle: 'Keep — make boards never want to leave',
        href: '/our-approach/boardretain',
        color: '#4FC2B5',
        pillar: 'retain',
        stageWord: 'Keep',
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resource-hub',
    megaResources: true,
    items: [
      {
        label: 'Resource Hub',
        href: '/resource-hub',
        subtitle: 'Guides, frameworks, and tools for CAM growth',
        icon: 'library',
      },
      {
        label: 'Courses',
        href: '/courses',
        subtitle: 'Self-paced training for boards and CAM teams',
        icon: 'graduation',
      },
      {
        label: 'Results & Case Studies',
        href: '/results',
        subtitle: 'Real outcomes from real CAM companies',
        icon: 'chart',
      },
      {
        label: 'FAQ',
        href: '/faq',
        subtitle: 'Common questions about working with Alloy',
        icon: 'help',
      },
    ],
    feature: {
      eyebrow: 'Featured Course',
      title: 'Trust Building',
      sub: 'A compact program for boards on what to expect from a great management partner — and how to spot a great one.',
      tag: 'Self-paced · 4 lessons',
      href: '/courses/trust-building',
      cta: 'Open course',
    },
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    megaAbout: true,
    items: [
      {
        label: 'About Alloy',
        href: '/about',
        subtitle: 'The operators-turned-marketers behind the system',
        icon: 'library',
      },
      {
        label: 'Testimonials',
        href: '/about/testimonials',
        subtitle: 'Real CAM partners on what changed',
        icon: 'chart',
      },
      {
        label: 'We-Know-CAM™',
        href: '/we-know-cam',
        subtitle: 'Why category fluency beats generic agency speak',
        icon: 'graduation',
      },
    ],
    feature: {
      eyebrow: 'Operator Review',
      quote: 'Alloy has been such a valuable partner for our HOA management company. Skyler, Justin, and the whole team are not only incredibly talented but also genuinely invested in our success.',
      name: 'Rim E.',
      role: 'HOA Management Operator',
      tag: '5 stars · Verified partner',
      href: '/about/testimonials',
      cta: 'Read more testimonials',
    },
  },
];
