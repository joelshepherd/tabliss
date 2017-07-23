export type Type = 'background' | 'widget';

export interface Plugin {
  type: Type;
  title: string;
  settings: any;
}
