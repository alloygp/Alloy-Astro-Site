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
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  mega?: boolean;
  children?: NavChild[];
}

export const NAV: NavItem[] = [
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    children: [
      { label: 'CAM Marketing Services', href: '/hoa-cam-marketing-services' },
      { label: 'SEO & AI Search', href: '/property-management-seo' },
      { label: 'HOA Board Education', href: '/hoa-board-education-programs' },
      { label: 'Groundwork — Fractional BD', href: '/groundwork' },
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
