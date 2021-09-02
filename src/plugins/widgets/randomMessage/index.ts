import { Config } from "../../types";
import RandomMessage from "./RandomMessage";
import RandomMessageSettings from "./RandomMessageSettings";

const config: Config = {
  key: "widget/randomMessage",
  name: "Random Messages",
  description: "Add messages to show randomically.",
  dashboardComponent: RandomMessage,
  settingsComponent: RandomMessageSettings,
};

export default config;
