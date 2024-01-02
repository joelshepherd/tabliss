import { Config } from "../../types";
import Online from "./Online";
import OnlineSettings from "./OnlineSettings";

const config: Config = {
  key: "background/online",
  name: "Online Image",
  description: "Show online image",
  dashboardComponent: Online,
  settingsComponent: OnlineSettings,
  supportsBackdrop: true,
};

export default config;
