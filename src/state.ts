import localForage from "localforage";
import { DB, Storage } from "./lib";
import { defaultLocale } from "./locales";

/**
 * Database state
 */
interface Store {
  /** Background ID */
  background: string;
  /**
   * Widget IDs
   * TODO: handle list conflict resolution
   */
  widgets: string[];
  /** Whether focus has been activated */
  focus: boolean;
  /** Locale selected */
  locale: string;
  /** Time zone selected, if any */
  timeZone: string | null;
  /** Plugin data storage */
  [key: `data/${string}`]: Data | undefined;
}

/**
 * Plugin data record
 */
export type Data = BackgroundData | WidgetData;

export interface BackgroundData {
  id: string;
  key: string;
  settings?: unknown;
  display: BackgroundDisplay;
}

export interface BackgroundDisplay {
  blur?: 0;
  luminosity?: number;
}

export interface WidgetData {
  id: string;
  key: string;
  settings?: unknown;
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
const initData: Store = {
  background: "default/unsplash",
  widgets: ["default/time", "default/greeting"],
  focus: false,
  locale: defaultLocale,
  timeZone: null,
  "data/default-background": {
    id: "default/unsplash",
    key: "background/colour",
    display: {
      luminosity: 0,
      blur: 0,
    },
  },
  "data/default-time": {
    id: "default/time",
    key: "widget/time",
    display: {
      position: "middleCentre",
    },
  },
  "data/default-greeting": {
    id: "default/time",
    key: "widget/greeting",
    display: {
      position: "middleCentre",
    },
  },
};

// Database storage
export const db = DB.init<Store>(initData);
Storage.local(db, "tabliss");

// Cache storage
export const cache = DB.init<Record<string, {} | undefined>>();
Storage.localForage(
  cache,
  localForage.createInstance({
    name: "tabliss",
    driver: localForage.INDEXEDDB,
    storeName: "cache",
  }),
);
