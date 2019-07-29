import { Plugin } from '../../types';
import Unsplash from './Unsplash';
import UnsplashSettings from './UnsplashSettings';

const config: Plugin = {
  key: 'background/unsplash',
  name: 'Unsplash',
  description: 'Who has time to add their own images.',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
  supportsBackdrop: true,
};

export default config;
