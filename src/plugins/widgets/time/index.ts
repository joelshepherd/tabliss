import { Plugin } from '../../types';
import Time from './Time';
import TimeSettings from './TimeSettings';

const config: Plugin = {
  key: 'widget/time',
  name: 'Time',
  description: 'Be on time.',
  Dashboard: Time,
  Settings: TimeSettings,
};

export default config;
