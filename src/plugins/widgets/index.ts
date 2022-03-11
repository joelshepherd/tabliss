import css from "./css";
import greeting from "./greeting";
import ipInfo from "./ipInfo";
import links from "./links";
import literatureClock from "./literatureClock";
import js from "./js";
import message from "./message";
import nba from "./nba";
import quote from "./quote";
import search from "./search";
import time from "./time";
import todo from "./todo";
import weather from "./weather";
import workHours from "./workHours";

export const widgetConfigs = [
  css,
  greeting,
  ipInfo,
  links,
  literatureClock,
  message,
  nba,
  quote,
  search,
  time,
  todo,
  weather,
  workHours,
];

if (BUILD_TARGET === "web") {
  widgetConfigs.push(js);
}

widgetConfigs.sort((a, b) => a.name.localeCompare(b.name));
