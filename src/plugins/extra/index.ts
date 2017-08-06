import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import {
  Dribbble, DribbbleSettings,
  Giphy, GiphySettings,
  Unsplash, UnsplashSettings
} from './backgrounds';

registerPlugin({
  key: 'extra/backgrounds/dribbble',
  type: Type.BACKGROUND,
  title: 'Dribbble',
  Dashboard: Dribbble,
  Settings: DribbbleSettings,
});

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
