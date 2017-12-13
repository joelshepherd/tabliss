import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import {
  Colour, ColourSettings,
  Gradient, GradientSettings,
  Image, ImageSettings,
} from './backgrounds';
import {
  Font, FontSettings,
  Greeting, GreetingSettings,
  Links, LinksSettings,
  Message, MessageSettings,
  Time, TimeSettings,
} from './widgets';

// Backgrounds
registerPlugin({
  key: 'core/backgrounds/colour',
  type: Type.BACKGROUND,
  title: 'Solid Colour',
  Dashboard: Colour,
  Settings: ColourSettings,
});

registerPlugin({
  key: 'core/backgrounds/gradient',
  type: Type.BACKGROUND,
  title: 'Colour Gradient',
  Dashboard: Gradient,
  Settings: GradientSettings,
});

registerPlugin({
  key: 'core/backgrounds/image',
  type: Type.BACKGROUND,
  title: 'Upload Images',
  Dashboard: Image,
  Settings: ImageSettings,
});

// Widgets
registerPlugin({
  key: 'core/widgets/time',
  type: Type.WIDGET,
  title: 'Time',
  Dashboard: Time,
  Settings: TimeSettings,
});

registerPlugin({
  key: 'core/widgets/greeting',
  type: Type.WIDGET,
  title: 'Greeting',
  Dashboard: Greeting,
  Settings: GreetingSettings,
});

registerPlugin({
  key: 'core/widgets/message',
  type: Type.WIDGET,
  title: 'Message',
  Dashboard: Message,
  Settings: MessageSettings,
});

registerPlugin({
  key: 'core/widgets/links',
  type: Type.WIDGET,
  title: 'Quick Links',
  Dashboard: Links,
  Settings: LinksSettings,
});

registerPlugin({
  key: 'core/widgets/font',
  type: Type.WIDGET,
  title: 'Font Settings',
  Dashboard: Font,
  Settings: FontSettings,
});
