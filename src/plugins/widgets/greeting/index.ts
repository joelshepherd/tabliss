import { Config } from "../../types";
import Greeting from "./Greeting";
import GreetingSettings from "./GreetingSettings";

const config: Config = {
  key: "widget/greeting",
  name: "Greeting",
  description: "Be personally greeted all day.",
  dashboardComponent: Greeting,
  settingsComponent: GreetingSettings,
};

export default config;
