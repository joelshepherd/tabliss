import Unsplash from './Unsplash';
import UnsplashSettings from './UnsplashSettings';

export default {
  type: 'background/unsplash',
  kind: 'background',
  title: 'Unsplash',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
} as const;
