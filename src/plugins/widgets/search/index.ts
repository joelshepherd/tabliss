import Search from './Search';
import SearchSettings from './SearchSettings';

export default {
  type: 'widget/search',
  kind: 'widget',
  title: 'Search Box',
  Dashboard: Search,
  Settings: SearchSettings,
} as const;
