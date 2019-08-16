import css from './css';
import greeting from './greeting';
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

export const widgetConfigs = [
  css,
  greeting,
  links,
  literatureClock,
  message,
  nba,
  quote,
  search,
  time,
  todo,
  weather,
];

if (process.env.BUILD_TARGET === 'web') {
  widgetConfigs.push(js);
}
