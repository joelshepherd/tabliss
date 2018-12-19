export interface Engine {
  key: string;
  name: string;
  search_url: string;
  suggestions_url?: string;
}

export interface Settings {
  searchEngine?: string;
  placeholder?: string;
  suggestionsEngine?: string;
  suggestionsQuantity?: number;
}
