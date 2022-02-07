import localForage from "localforage";
import { DB, Storage } from "./lib";
import { defaultLocale } from "./locales";

/**
 * Database state
 */
interface State {
  /** Background state */
  background: BackgroundState;
  /** Widget state */
  widgets: WidgetState[];
  /** Plugin data */
  [id: `data/${string}`]: unknown | undefined;
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
}

export interface WidgetState {
  id: string;
  key: string;
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
    key: "background/colour",
    display: {
      luminosity: 0,
      blur: 0,
    },
  },
  widgets: [
    {
      id: "default-time",
      key: "widget/time",
      display: {
        position: "middleCentre",
      },
    },
    {
      id: "default-greeting",
      key: "widget/greeting",
      display: {
        position: "middleCentre",
      },
    },
  ],
  focus: false,
  locale: defaultLocale,
  timeZone: null,
};

// Database storage
export const db = DB.init<State>(initData);
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
