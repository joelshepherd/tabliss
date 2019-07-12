/**
 * Literature Clock Widget for Tabliss
 * Forked by Ngoc L.B. <contact@ngoclb.com>
 * ===
 * Clock using time quotes from the literature, based on work and idea by Jaap Meijers (E-reader clock).
 * @url http://jenevoldsen.com/literature-clock/
 * @url https://github.com/JohannesNE/literature-clock
 */
import LiteratureClock from './LiteratureClock';
import LiteratureClockSettings from './LiteratureClockSettings';

export default {
  type: 'widget/literature-clock',
  kind: 'widget',
  title: 'Literature Clock',
  Dashboard: LiteratureClock,
  Settings: LiteratureClockSettings,
} as const;
