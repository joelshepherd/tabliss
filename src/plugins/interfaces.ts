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
  WIDGET = 'widget',
}

export interface Local {
  [key: string]: any; // tslint:disable-line no-any
}

export interface Settings {
  [key: string]: any; // tslint:disable-line no-any
}

export interface PluginAPI extends Settings {
  local?: Local;
  setLocal: (state: Local) => void;
  updateLocal: (state: Local) => void;
}

export interface API<Data = {}, Cache = {}> {
  cache: Cache;
  setCache: (cache: Cache) => void;

  data: Data;
  setData: (data: Data) => void;
}
