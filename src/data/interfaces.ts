import { Settings } from '../plugins';

// Root state
export interface State {
  version: number;
  booted: boolean;
  dashboard: Dashboard;
  plugins: Plugins;
  // providers: plugin providers
}

// Dashboard slice
export interface Dashboard {
  background: string;
  focus: boolean;
  system: string[];
  widgets: string[];
}

// Plugins slice
export interface Plugins {
  [key: string]: {
    settings: Settings;
    state?: any; // tslint:disable-line no-any
  };
}
