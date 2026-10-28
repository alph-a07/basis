export interface TocItem {
  depth: number;
  slug: string;
  text: string;
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface ComponentTab {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}
