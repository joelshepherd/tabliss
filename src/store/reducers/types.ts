export type CacheState = {
  [id: string]: object | undefined;
};

export type BackgroundDisplay = {
  blur: number;
  luminosity: number;
  enableBlur: boolean;
};

export type WidgetPosition =
  | "topLeft"
  | "topCentre"
  | "topRight"
  | "middleLeft"
  | "middleCentre"
  | "middleRight"
  | "bottomLeft"
  | "bottomCentre"
  | "bottomRight";

export type WidgetDisplay = {
  colour?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  position: WidgetPosition;
};

type PluginState<Display> = {
  id: string;
  /**
   * May not exactly match plugin keys.
   * Keys of removed plugins may still exist in a browser's storage for instance
   */
  key: string;
  active: boolean;
  display: Display;
};

export type BackgroundState = PluginState<BackgroundDisplay>;

export type WidgetState = PluginState<WidgetDisplay>;

export type DataState = {
  backgrounds: BackgroundState[];
  widgets: WidgetState[];
  data: {
    [id: string]: object;
  };
  locale?: string;
  timeZone?: string;
};

export type UiState = {
  focus: boolean;
  loaders: number;
  settings: boolean;
  storeError?: Error;
};

export type RootState = {
  // This is not synced
  cache: CacheState;

  // This is synced
  data: DataState;

  // Controlled the user interface
  ui: UiState;
};
