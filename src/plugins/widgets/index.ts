import css from './css';
import greeting from './greeting';
import ipInfo from "./ipInfo";
import links from './links';
import literatureClock from './literatureClock';
import js from './js';
import message from './message';
import nba from './nba';
import quote from './quote';
import search from './search';
import time from './time';
import todo from './todo';
import weather from './weather';
import timer from './timer';
import github from "./github";
import notes from "./notes";
import workHours from "./workHours";
import joke from "./joke";

export const widgetConfigs = [
  css,
  github,
  greeting,
  ipInfo,
  links,
  literatureClock,
  message,
  nba,
  notes,
  quote,
  search,
  time,
  todo,
  weather,
  timer,
  workHours,
  joke,
];

if (BUILD_TARGET === "web") {
  widgetConfigs.push(js);
}

widgetConfigs.sort((a, b) => a.name.localeCompare(b.name));
