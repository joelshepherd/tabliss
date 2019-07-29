import { Plugin } from '../../types';
import Search from './Search';
import SearchSettings from './SearchSettings';

const config: Plugin = {
  key: 'widget/search',
  name: 'Search Box',
  description: 'Replace your URL bar with another bar.',
  Dashboard: Search,
  Settings: SearchSettings,
};

export default config;
