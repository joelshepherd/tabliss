import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import {
  Colour, ColourSettings,
  Gradient, GradientSettings,
  Image, ImageSettings,
} from './Backgrounds';
import { Font, FontSettings } from './System';
import {
  Greeting, GreetingSettings,
  Time, TimeSettings,
} from './Widgets';

// Backgrounds
registerPlugin({
  key: 'core/backgrounds/colour',
  type: Type.BACKGROUND,
  title: 'Colour',
  Dashboard: Colour,
  Settings: ColourSettings,
});

registerPlugin({
  key: 'core/backgrounds/gradient',
  type: Type.BACKGROUND,
  title: 'Gradient',
  Dashboard: Gradient,
  Settings: GradientSettings,
});

registerPlugin({
  key: 'core/backgrounds/image',
  type: Type.BACKGROUND,
  title: 'Image',
  Dashboard: Image,
  Settings: ImageSettings,
});

// Widgets
registerPlugin({
  key: 'core/widgets/greeting',
  type: Type.WIDGET,
  title: 'Greeting',
  Dashboard: Greeting,
  Settings: GreetingSettings,
});

registerPlugin({
  key: 'core/widgets/time',
  type: Type.WIDGET,
  title: 'Time',
  Dashboard: Time,
  Settings: TimeSettings,
});

// System
registerPlugin({
  key: 'extra/system/font',
  type: Type.SYSTEM,
  title: 'Font',
  Dashboard: Font,
  Settings: FontSettings,
});
