import Giphy from './Giphy';
import GiphySettings from './GiphySettings';

export default {
  type: 'background/giphy',
  kind: 'background',
  title: 'GIPHY',
  Dashboard: Giphy,
  Settings: GiphySettings,
} as const;
