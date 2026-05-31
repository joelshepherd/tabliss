import { Config } from "../../types";
import CustomApi from "./CustomApi";
import CustomApiSettings from "./CustomApiSettings";

const config: Config = {
  key: "background/customApi",
  name: "Custom API",
  description: "Fetch a background image from your own API.",
  dashboardComponent: CustomApi,
  settingsComponent: CustomApiSettings,
  supportsBackdrop: true,
};

export default config;
