import { ComponentType } from 'react';

import { BACKGROUND_PLUGINS, WIDGET_PLUGINS } from './plugins';

export type Kind = 'background' | 'widget';

export type Plugin = {
  readonly key: string;
  readonly kind: Kind;
  readonly name: string;
  readonly description: string;
  readonly Dashboard: ComponentType<API<any, any>>;
  readonly Settings?: ComponentType<API<any, any>>;
};

export type BackgroundPluginType = typeof BACKGROUND_PLUGINS[number]['key'];
export type WidgetPluginType = typeof WIDGET_PLUGINS[number]['key'];

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
