import type { Browser } from "webextension-polyfill";

declare global {
  const BUILD_TARGET: "chromium" | "firefox" | "web";
  const DEV: boolean;
  const GIPHY_API_KEY: string;
  const UNSPLASH_API_KEY: string;
  const VERSION: string;

  const browser: Browser;
}
