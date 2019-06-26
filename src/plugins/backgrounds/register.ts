import { Type } from '../interfaces';
import { registerPlugin } from '../registry';

import { Colour, ColourSettings } from './colour';
import { Giphy, GiphySettings } from './giphy';
import { Gradient, GradientSettings } from './gradient';
import { Image, ImageSettings } from './image';
import { Unsplash, UnsplashSettings } from './unsplash';

registerPlugin({
  key: 'background/colour',
  type: Type.BACKGROUND,
  title: 'Solid Colour',
  Dashboard: Colour,
  Settings: ColourSettings,
});

registerPlugin({
  key: 'background/giphy',
  type: Type.BACKGROUND,
  title: 'GIPHY',
  Dashboard: Giphy,
  Settings: GiphySettings,
});

registerPlugin({
  key: 'background/gradient',
  type: Type.BACKGROUND,
  title: 'Colour Gradient',
  Dashboard: Gradient,
  Settings: GradientSettings,
});

registerPlugin({
  key: 'background/image',
  type: Type.BACKGROUND,
  title: 'Upload Images',
  Dashboard: Image,
  Settings: ImageSettings,
});

registerPlugin({
  key: 'background/unsplash',
  type: Type.BACKGROUND,
  title: 'Unsplash',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
});
