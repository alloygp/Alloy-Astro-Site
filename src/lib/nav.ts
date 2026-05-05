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
  isNew?: boolean;
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

export interface NavItem {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  megaServices?: boolean;
  pillars?: NavPillar[];
  children?: NavChild[];
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
          { label: 'CAM Marketing Services', href: '/hoa-cam-marketing-services' },
          { label: 'Property Management SEO & AI Search', href: '/property-management-seo' },
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
          { label: 'Groundwork — Fractional BD', href: '/groundwork' },
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
          { label: 'HOA Board Education Programs', href: '/hoa-board-education-programs' },
          {
            label: 'Newsletter Production for HOA Management',
            href: '/services/newsletter-production-for-hoa-management',
            isNew: true,
          },
          {
            label: 'Social Media Marketing for HOA Management',
            href: '/services/social-media-marketing-for-hoa-management-companies',
            isNew: true,
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
    children: [
      { label: 'Resource Hub', href: '/resource-hub' },
      { label: 'Courses', href: '/courses' },
      { label: 'Results & Case Studies', href: '/results' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Testimonials', href: '/about/testimonials' },
      { label: 'We-Know-CAM™', href: '/we-know-cam' },
    ],
  },
];
