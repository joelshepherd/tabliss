import { Plugin } from '../../types';
import Greeting from './Greeting';
import GreetingSettings from './GreetingSettings';

const config: Plugin = {
  key: 'widget/greeting',
  name: 'Greeting',
  description: 'Be personally greeting all day.',
  Dashboard: Greeting,
  Settings: GreetingSettings,
};

export default config;
