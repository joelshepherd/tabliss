import { ComponentType } from 'react';

// Plugin
export interface Plugin {
  key: string;
  type: Type;
  title: string;
  Dashboard: ComponentType<API<any, any>>;
  Settings?: ComponentType<API<any, any>>;
}

// Types
export type Type = 'background' | 'widget';

export interface API<Data = {}, Cache = {}> {
  cache?: Cache;
  setCache: (cache: Cache) => void;

  data?: Data;
  setData: (data: Data) => void;

  loader: {
    push: () => void;
    pop: () => void;
  };
}
