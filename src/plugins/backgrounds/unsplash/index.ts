import { Config } from '../../types';
import Unsplash from './Unsplash';
import UnsplashSettings from './UnsplashSettings';

const config: Config = {
  key: 'background/unsplash',
  name: 'Unsplash',
  description: 'Who has time to add their own images.',
  dashboardComponent: Unsplash,
  settingsComponent: UnsplashSettings,
  supportsBackdrop: true,
};

export default config;
