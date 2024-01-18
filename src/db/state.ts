import { DB, Storage } from "../lib";
import { defaultLocale } from "../locales";

/**
 * Database state
 */
export interface State {
  /** Background state */
  background: BackgroundState;
  /** Widget state */
  [key: `widget/${string}`]: WidgetState | null;
  /** Plugin data */
  [key: `data/${string}`]: unknown;
  /** Whether focus has been activated */
  focus: boolean;
  /** Locale selected */
  locale: string;
  /** Time zone selected, if any */
  timeZone: string | null;
}

export interface BackgroundState {
  id: string;
  key: string;
  display: BackgroundDisplay;
}

export interface BackgroundDisplay {
  blur?: number;
  luminosity?: number;
  nightDim?: boolean;
}

export interface WidgetState {
  id: string;
  key: string;
  order: number;
  display: WidgetDisplay;
}

export interface WidgetDisplay {
  colour?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  position: WidgetPosition;
}

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

// Init data for the store
const initData: State = {
  background: {
    id: "default-unsplash",
    key: "background/unsplash",
    display: {
      luminosity: -0.2,
      blur: 0,
      nightDim: false,
    },
  },
  "widget/default-time": {
    id: "default-time",
    key: "widget/time",
    order: 0,
    display: {
      position: "middleCentre",
    },
  },
  "widget/default-greeting": {
    id: "default-greeting",
    key: "widget/greeting",
    order: 1,
    display: {
      position: "middleCentre",
    },
  },
  focus: false,
  locale: defaultLocale,
  timeZone: null,
};

// Database storage
export const db = DB.init<State>(initData);

// Cache storage
export const cache = DB.init<Record<string, unknown | undefined>>();

// Persist data
export const dbStorage =
  BUILD_TARGET === "web"
    ? Storage.indexeddb(db, "tabliss/config")
    : Storage.extension(db, "tabliss/config", "sync");

export const cacheStorage =
  BUILD_TARGET === "firefox"
    ? Storage.extension(cache, "tabliss/cache", "local")
    : Storage.indexeddb(cache, "tabliss/cache");
