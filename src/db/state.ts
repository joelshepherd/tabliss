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
    key: "background/colour",
    display: {
      luminosity: 0,
      blur: 0,
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
export const ready =
  process.env.BUILD_TARGET === "web"
    ? Promise.all([
        Storage.indexeddb(db, "tabliss/config"),
        Storage.indexeddb(cache, "tabliss/cache"),
      ])
    : Promise.all([
        Storage.extension(db, "tabliss/config", "sync"),
        // Chromium cannot store blobs in extension.local
        // Firefox cannot use indexeddb in private mode
        process.env.BUILD_TARGET === "firefox"
          ? Storage.extension(cache, "tabliss/cache", "local")
          : Storage.indexeddb(cache, "tabliss/cache"),
      ]);

// TODO: Consider asking for persistence
// navigator.storage.persist().then((persistent) => {
//   console.log(persistent);
//   if (!persistent)
//     console.log(
//       "Your browser may delete your setting under various conditions if you do not allow persistent storage.",
//     );
// });

/** Select widgets from database */
export const selectWidgets = (): WidgetState[] => {
  return Array.from(DB.prefix(db, "widget/"))
    .map(([, val]) => val)
    .filter((val): val is WidgetState => val !== null)
    .sort((a, b) => a.order - b.order);
};
