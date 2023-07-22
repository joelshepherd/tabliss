import { Config } from "../../types";
import Apod from "./Apod";
import ApodSettings from "./ApodSettings";

const config: Config = {
  key: "background/apod",
  name: "Astronomy Picture of the Day",
  description: "NASA's sky pictures",
  dashboardComponent: Apod,
  settingsComponent: ApodSettings,
  supportsBackdrop: true,
};

export default config;
