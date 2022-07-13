import { Config } from "../../types";
import Nba from "./Nba";
import NbaSettings from "./NbaSettings";

const config: Config = {
  key: "widget/nba",
  name: "NBA Scores",
  description: "Keep up to date with today's NBA games.",
  dashboardComponent: Nba,
  settingsComponent: NbaSettings,
};

export default config;
