import { ComponentType } from 'react';

// Plugin
export interface Plugin {
  key: string;
  type: Type;
  title: string;
  Dashboard: ComponentType<any>; // tslint:disable-line no-any
  Settings?: ComponentType<any>; // tslint:disable-line no-any
}

// Types
export enum Type {
  BACKGROUND = 'background',
  SYSTEM = 'system',
  WIDGET = 'widget',
}

// Settings
export interface Settings {
  [key: string]: any; // tslint:disable-line no-any
}

export interface State {
  [key: string]: any; // tslint:disable-line no-any
}
