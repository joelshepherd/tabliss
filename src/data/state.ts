import { Settings } from '../plugins';

// Root state
export interface State {
  version: number;
  dashboard: Dashboard;
  plugins: Plugins;
  // providers: plugin providers
};

// Dashboard slice
export interface Dashboard {
  background: string;
  widgets: string[];
}

// Plugins slice
export interface Plugins {
  [key: string]: {
    settings: Settings;
    state?: any;
  };
}
