export interface Link {
  name?: string;
  icon?: string;
  url: string;
}

export interface Settings {
  columns: number;
  links: Link[];
  visible: boolean;
}
