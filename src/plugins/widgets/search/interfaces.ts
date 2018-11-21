export interface Engine {
  key: string;
  name: string;
  search_url: string;
}

export interface Settings {
  engine?: string;
  placeholder?: string;
  suggestions?: boolean;
}
