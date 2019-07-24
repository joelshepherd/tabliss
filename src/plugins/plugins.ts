import colour from './backgrounds/colour';
import giphy from './backgrounds/giphy';
import gradient from './backgrounds/gradient';
import image from './backgrounds/image';
import unsplash from './backgrounds/unsplash';

import css from './widgets/css';
import greeting from './widgets/greeting';
import links from './widgets/links';
import literatureClock from './widgets/literatureClock';
import message from './widgets/message';
import nba from './widgets/nba';
import quote from './widgets/quote';
import search from './widgets/search';
import time from './widgets/time';
import todo from './widgets/todo';
import weather from './widgets/weather';

export const BACKGROUND_PLUGINS = [colour, giphy, gradient, image, unsplash];
export const WIDGET_PLUGINS = [
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
export const PLUGINS = [...BACKGROUND_PLUGINS, ...WIDGET_PLUGINS];

export function get(type: string) {
  const plugin = PLUGINS.find(plugin => plugin.key === type);

  if (!plugin) throw new Error(`Unable to find plugin: ${type}`);

  return plugin;
}
