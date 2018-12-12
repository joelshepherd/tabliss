export interface Engine {
  key: string;
  name: string;
  search_url: string;
  suggestions_url?: string;
}

export interface Settings {
  searchEngine?: string;
  placeholder?: string;
  suggestionsEngine?: string; // I would have created an object but it doesn't really update (only on page reload)
  suggestionsQuantity?: number;
}
