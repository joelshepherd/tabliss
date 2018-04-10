export interface Link {
  name?: string;
  faIcon?: string;
  url: string;
}

export interface Settings {
  links: Link[];
  visible: boolean;
}
