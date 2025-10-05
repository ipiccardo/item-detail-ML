export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  sections: FooterSection[];
  alwaysVisibleLinks: FooterLink[];
  secondaryLinks: FooterLink[];
  copyright: string;
  address: string;
}
