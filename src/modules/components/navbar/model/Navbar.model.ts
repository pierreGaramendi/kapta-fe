interface Link {
  label: string;
  link: string;
}

export interface INavbarItem {
  label: string;
  icon: any;
  initiallyOpened?: boolean;
  link?: string;
  links?: Link[];
}

export interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}
