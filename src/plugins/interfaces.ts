import { ComponentClass } from 'react';

// Plugin
export interface Plugin {
  key: string;
  type: Type;
  title: string;
  Dashboard: ComponentClass<any>; // tslint:disable-line no-any
  Settings?: ComponentClass<any>; // tslint:disable-line no-any
}

// Types
export enum Type {
  BACKGROUND = 'background',
  SYSTEM = 'system',
  WIDGET = 'widget',
}

// Settings
export interface Settings {
  [key: string]: boolean | null | number | string | undefined;
}
