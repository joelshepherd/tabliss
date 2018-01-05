declare module 'in-browser-language' {
  export function list(): string[];
  export function first(): string;
  export function pick(supported: string[]): string | null;
  export function pick(supported: string[], fallback: string): string;
}
