import { Config } from "../../types";
import { Unsplash, UnsplashReloader } from "./Unsplash";
import UnsplashSettings from "./UnsplashSettings";


const config: Config = {
  key: "background/unsplash",
  name: "Unsplash",
  description: "Who has time to find their own images.",
  dashboardComponent: Unsplash,
  settingsComponent: UnsplashSettings,
  reloader: UnsplashReloader,
  supportsBackdrop: true,
};

export default config;
