export interface Link {
  name?: string;
  icon?: string;
  url: string;
}

export interface Settings {
  links: Link[];
  visible: boolean;
}
