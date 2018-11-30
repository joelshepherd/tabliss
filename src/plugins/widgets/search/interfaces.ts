export interface Engine {
  key: string;
  name: string;
  search_url: string;
}

export interface Settings {
  engine?: string;
  placeholder?: string;
  active?: boolean; // suggestions active, i would have created and object but it doesn't really update (only on page reload)
  quantity?: number; // suggestions quantity
}
