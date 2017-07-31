import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import { Giphy, GiphySettings, Unsplash, UnsplashSettings } from './Backgrounds';

registerPlugin({
  key: 'extra/backgrounds/giphy',
  type: Type.BACKGROUND,
  title: 'GIPHY',
  Dashboard: Giphy,
  Settings: GiphySettings,
});

registerPlugin({
  key: 'extra/backgrounds/unsplash',
  type: Type.BACKGROUND,
  title: 'Unsplash',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
});
