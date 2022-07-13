import { Config } from "../../types";
import GitHubCalendarWidget from "./GitHub";
import GitHubSettings from "./GitHubSettings";

const config: Config = {
  key: "widget/github",
  name: "GitHub Calendar",
  description: "Get motivated by green squares.",
  dashboardComponent: GitHubCalendarWidget,
  settingsComponent: GitHubSettings,
};

export default config;
