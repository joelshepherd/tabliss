import { Config } from "../../types";
import WorkHours from "./WorkHours";
import WorkHoursSettings from "./WorkHoursSettings";

const config: Config = {
  key: "widget/activeWorkHours",
  name: "Active Work Hours",
  description: "Count down the real time working hours.",
  dashboardComponent: WorkHours,
  settingsComponent: WorkHoursSettings,
};

export default config;
