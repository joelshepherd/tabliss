import { ComponentType } from 'react';

/** Plugin API interface. */
export interface API<Data = {}, Cache = {}> {
  /**
   * A temporary cache for storing large or temporary objects for the plugin.
   */
  cache?: Cache;
  /**
   * Set (replace) the cache for the plugin.
   */
  setCache: (cache: Cache) => void;

  /**
   * A permanent (and synced) data store for storing small items and settings for the plugin.
   * Note, the total Tabliss can store here is 100KB across all plugins.
   */
  data?: Data;
  /**
   * Set (replace) the data store for the plugin.
   */
  setData: (data: Data) => void;

  /**
   * Contol the loading indicator when the plugin is fetching remote data.
   */
  loader: {
    push: () => void;
    pop: () => void;
  };
}

/** Plugin config object type. */
export type Config = {
  readonly key: string;
  readonly name: string;
  readonly description: string;
  readonly dashboardComponent: ComponentType<API<any, any>>;
  readonly settingsComponent?: ComponentType<API<any, any>>;
  readonly supportsBackdrop?: boolean;
};
