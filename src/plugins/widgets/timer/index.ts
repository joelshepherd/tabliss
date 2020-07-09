import { Config } from '../../types';
import Timer from './Timer';
import TimerSettings from './TimerSettings';

const config: Config = {
  key: 'widget/timer',
  name: 'Timer',
  description: 'Add a timer to a task',
  dashboardComponent: Timer,
  settingsComponent: TimerSettings,
};

export default config;
