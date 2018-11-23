export interface Engine {
  key: string;
  name: string;
  search_url: string;
}

export interface Settings {
  engine?: string;
  placeholder?: string;
  active?: boolean; // suggestions active, i would have created and object put it doesn't really update (only on page reload)
  quantity?: number; // suggestions quantity
}

export interface SuggestionsResult {
  [0]: string;
  [1]: {
    [index: number]: string;
  };
}
