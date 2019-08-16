import { Config } from '../../types';
import Search from './Search';
import SearchSettings from './SearchSettings';

const config: Config = {
  key: 'widget/search',
  name: 'Search Box',
  description: 'Move your URL bar.',
  dashboardComponent: Search,
  settingsComponent: SearchSettings,
};

export default config;
