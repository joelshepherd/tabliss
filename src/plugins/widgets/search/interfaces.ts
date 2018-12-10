export interface Engine {
  key: string;
  name: string;
  search_url: string;
}

export interface Settings {
  engine?: string;
  placeholder?: string;
  suggestionsActive?: boolean; // I would have created an object but it doesn't really update (only on page reload)
  suggestionsQuantity?: number;
}
