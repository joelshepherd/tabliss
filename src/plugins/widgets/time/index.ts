import { Config } from "../../types";
import Time from "./Time";
import TimeSettings from "./TimeSettings";

const config: Config = {
  key: "widget/time",
  name: "Time",
  description: "Be on time.",
  dashboardComponent: Time,
  settingsComponent: TimeSettings,
};

export default config;
