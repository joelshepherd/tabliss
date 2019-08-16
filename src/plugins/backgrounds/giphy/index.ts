import { Config } from '../../types';
import Giphy from './Giphy';
import GiphySettings from './GiphySettings';

const config: Config = {
  key: 'background/giphy',
  name: 'GIPHY',
  description: 'Hurt your eyes in every new tab.',
  dashboardComponent: Giphy,
  settingsComponent: GiphySettings,
  supportsBackdrop: true,
};

export default config;
