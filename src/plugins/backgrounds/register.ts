import { registerPlugin } from '../registry';

import { Colour, ColourSettings } from './colour';
import { Giphy, GiphySettings } from './giphy';
import { Gradient, GradientSettings } from './gradient';
import { Image, ImageSettings } from './image';
import { Unsplash, UnsplashSettings } from './unsplash';

registerPlugin({
  key: 'background/colour',
  type: 'background',
  title: 'Solid Colour',
  Dashboard: Colour,
  Settings: ColourSettings,
});

registerPlugin({
  key: 'background/giphy',
  type: 'background',
  title: 'GIPHY',
  Dashboard: Giphy,
  Settings: GiphySettings,
});

registerPlugin({
  key: 'background/gradient',
  type: 'background',
  title: 'Colour Gradient',
  Dashboard: Gradient,
  Settings: GradientSettings,
});

registerPlugin({
  key: 'background/image',
  type: 'background',
  title: 'Upload Images',
  Dashboard: Image,
  Settings: ImageSettings,
});

registerPlugin({
  key: 'background/unsplash',
  type: 'background',
  title: 'Unsplash',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
});
