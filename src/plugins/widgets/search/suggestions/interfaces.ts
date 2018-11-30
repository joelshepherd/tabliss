export interface SuggestionsResult {
  [0]: string;
  [1]: Array<string>;
}

export interface SuggestionsData {
  active: number;
  values: Array<string>;
}
