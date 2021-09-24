import { Config } from "../../types";
import GitHubCalendarWidget from "./GitHub";
import GitHubSettings from "./GitHubSettings";

const config: Config = {
  key: "widget/github",
  name: "GitHub Calendar",
  description: "Shows GitHub activity overview",
  dashboardComponent: GitHubCalendarWidget,
  settingsComponent: GitHubSettings,
};

export default config;
