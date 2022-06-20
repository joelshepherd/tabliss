import { Config } from "../../types";
import WorkHours from "./WorkHours";
import WorkHoursSettings from "./WorkHoursSettings";

const config: Config = {
  key: "widget/workHours",
  name: "Work Hours",
  description: "Count down the working hours.",
  dashboardComponent: WorkHours,
  settingsComponent: WorkHoursSettings,
};

export default config;
