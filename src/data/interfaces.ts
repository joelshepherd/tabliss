import { Settings } from '../plugins';

// Root state
export interface State {
  version: number;
  booted: boolean;
  dashboard: Dashboard;
  plugins: Plugins;
  ui: Ui;
  // providers: plugin providers
}

// Dashboard slice
export interface Dashboard {
  background: string;
  focus: boolean;
  widgets: string[];
}

// Plugins slice
export interface Plugins {
  [key: string]: {
    settings: Settings;
    state?: any; // tslint:disable-line no-any
  };
}

export interface Ui {
  settings: boolean;
}
