/**
 * Literature Clock Widget for Tabliss
 * Forked by Ngoc L.B. <contact@ngoclb.com>
 * ===
 * Clock using time quotes from the literature, based on work and idea by Jaap Meijers (E-reader clock).
 * @url http://jenevoldsen.com/literature-clock/
 * @url https://github.com/JohannesNE/literature-clock
 */
import { Plugin } from '../../types';
import LiteratureClock from './LiteratureClock';
import LiteratureClockSettings from './LiteratureClockSettings';

const config: Plugin = {
  key: 'widget/literature-clock',
  name: 'Literature Clock',
  description: 'Read the time with culture.',
  Dashboard: LiteratureClock,
  Settings: LiteratureClockSettings,
};

export default config;
