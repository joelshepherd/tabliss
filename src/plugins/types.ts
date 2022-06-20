import { ComponentType } from "react";

export type Cache<Shape = unknown> = {
  /**
   * A temporary cache for storing large or temporary objects for the plugin.
   */
  cache?: Shape;
  /**
   * Set (replace) the cache for the plugin.
   */
  setCache: (cache: Shape) => void;
};

export type Data<Shape = unknown> = {
  /**
   * A permanent (and synced) data store for storing small items and settings for the plugin.
   * Note, the total Tabliss can store here is 100KB across all plugins.
   */
  data?: Shape;
  /**
   * Set (replace) the data store for the plugin.
   */
  setData: (data: Shape) => void;
};

export type Loader = {
  push: () => void;
  pop: () => void;
};

/** Plugin API interface. */
export interface API<D = unknown, C = unknown> extends Data<D>, Cache<C> {
  /**
   * Contol the loading indicator when the plugin is fetching remote data.
   */
  loader: Loader;
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
