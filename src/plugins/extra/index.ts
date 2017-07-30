import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import { Giphy, GiphySettings } from './Backgrounds';

registerPlugin({
  key: 'extra/backgrounds/giphy',
  type: Type.BACKGROUND,
  title: 'GIPHY',
  Dashboard: Giphy,
  Settings: GiphySettings,
});
