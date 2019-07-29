import { ComponentType } from 'react';

import { BACKGROUNDS, WIDGETS } from './plugins';

export type Plugin = {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly Dashboard: ComponentType<API<any, any>>;
  readonly Settings?: ComponentType<API<any, any>>;
  readonly supportsBackdrop?: boolean;
};

export type BackgroundKeys = typeof BACKGROUNDS[number]['key'];
export type WidgetKeys = typeof WIDGETS[number]['key'];

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
