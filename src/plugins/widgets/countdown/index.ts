import { Config } from '../../types';
import Countdown from './Countdown';
import CountdownSettings from './CountdownSettings';

const config: Config = {
  key: 'widget/countdown',
  name: 'Countdown',
  description: 'Literally counting down the days.',
  dashboardComponent: Countdown,
  settingsComponent: CountdownSettings,
};

export default config;
