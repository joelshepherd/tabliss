import { Local, Settings } from '../plugins';

// Root state
export interface RootState {
  version: number;
  booted: boolean;
  dashboard: Dashboard;
  storage: Storage;
  ui: Ui;
}

// Dashboard slice
export interface Dashboard {
  background: string;
  widgets: string[];
}

// Plugins slice
export interface Storage {
  [key: string]: {
    local: Local;
    settings: Settings;
    sync: undefined;
  };
}

// Ui slice
export interface Ui {
  focus: boolean;
  pending: number;
  settings: boolean;
}
