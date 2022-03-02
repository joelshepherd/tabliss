declare const BUILD_TARGET: "chromium" | "firefox" | "web";
declare const DEV: boolean;
declare const GIPHY_API_KEY: string;
declare const UNSPLASH_API_KEY: string;
declare const VERSION: string;

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
