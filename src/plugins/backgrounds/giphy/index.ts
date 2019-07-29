import { Plugin } from '../../types';
import Giphy from './Giphy';
import GiphySettings from './GiphySettings';

const config: Plugin = {
  key: 'background/giphy',
  name: 'GIPHY',
  description: 'Hurt your eyes in every new tab.',
  Dashboard: Giphy,
  Settings: GiphySettings,
};

export default config;
