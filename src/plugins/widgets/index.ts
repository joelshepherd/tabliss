import countdown from './countdown';
import css from './css';
import greeting from './greeting';
import links from './links';
import literatureClock from './literatureClock';
import js from './js';
import message from './message';
import quote from './quote';
import search from './search';
import time from './time';
import todo from './todo';
import weather from './weather';

export const widgetConfigs = [
  countdown,
  css,
  greeting,
  links,
  literatureClock,
  message,
  quote,
  search,
  time,
  todo,
  weather,
];

if (process.env.BUILD_TARGET === 'web') {
  widgetConfigs.push(js);
}
