// Plugin
export interface Plugin {
  key: string;
  type: Type;
  title: string;
  Dashboard: any;
  Settings?: any;
}

// Types
export enum Type {
  BACKGROUND = 'background',
  WIDGET = 'widget',
};

// Settings
export interface Settings {
  [key: string]: any;
}
