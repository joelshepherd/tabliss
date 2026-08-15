import { Config } from "../../types";
import Pexels from "./Pexels";
import PexelsSettings from "./PexelsSettings";

const config: Config = {
  key: "background/pexels",
  name: "Pexels",
  description: "Free stock photos from Pexels.",
  dashboardComponent: Pexels,
  settingsComponent: PexelsSettings,
  supportsBackdrop: true,
};

export default config;