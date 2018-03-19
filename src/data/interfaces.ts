import { Local, Settings as PluginSettings } from '../plugins';

// Root state
export interface RootState {
  version: number;
  booted: boolean;
  dashboard: Dashboard;
  storage: Storage;
  settings: Settings;
  ui: Ui;
}

// Dashboard
export interface Dashboard {
  background: string;
  widgets: string[];
}

// Settings
export interface Settings {
  locale?: string;
  timezone?: string;
}

// Plugins
export interface Storage {
  [key: string]: {
    local: Local;
    settings: PluginSettings;
    sync: undefined;
  };
}

// Ui
export interface Ui {
  focus: boolean;
  pending: number;
  settings: boolean;
}
