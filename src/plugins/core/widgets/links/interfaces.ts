export interface Link {
  name?: string;
  url: string;
}

export interface Settings {
  links: Link[];
  visible: boolean;
}
