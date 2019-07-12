import { BACKGROUND_PLUGINS, WIDGET_PLUGINS } from './plugins';

export type Kind = 'background' | 'widget';

export type BackgroundPluginType = typeof BACKGROUND_PLUGINS[number]['type'];
export type WidgetPluginType = typeof WIDGET_PLUGINS[number]['type'];

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
