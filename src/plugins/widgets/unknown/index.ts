import { Config } from "../../types";
import Unknown from "./Unknown";
import UnknownSettings from "./UnknownSettings";

const config: Config = {
  key: "widget/unknown",
  name: "Unknown Widget",
  description: "Something went wrong.",
  dashboardComponent: Unknown,
  settingsComponent: UnknownSettings,
  supportsBackdrop: false
};

export default config;
