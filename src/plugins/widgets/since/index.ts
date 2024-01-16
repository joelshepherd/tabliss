import { Config } from '../../types';
import Since from './Since';
import SinceSettings from './SinceSettings';

const config: Config = {
  key: 'widget/since',
  name: 'Since',
  description: 'This widget tracks the time elapsed since or remaining until a specified event.',
  dashboardComponent: Since,
  settingsComponent: SinceSettings,
};

export default config;
