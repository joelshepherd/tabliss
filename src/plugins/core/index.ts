import { Plugin, Type } from '../interfaces';
import { registerPlugin } from '../registry';
import {
  Colour, ColourSettings,
  Gradient, GradientSettings,
  Image, ImageSettings,
} from './Backgrounds';
import * as widgets from './Widgets';

const plugins: Plugin[] = [
  {
    key: 'core/backgrounds/colour',
    type: Type.BACKGROUND,
    title: 'Colour',
    Dashboard: Colour,
    Settings: ColourSettings,
  },
  {
    key: 'core/backgrounds/gradient',
    type: Type.BACKGROUND,
    title: 'Gradient',
    Dashboard: Gradient,
    Settings: GradientSettings,
  },
  {
    key: 'core/backgrounds/image',
    type: Type.BACKGROUND,
    title: 'Image',
    Dashboard: Image,
    Settings: ImageSettings,
  },
  {
    key: 'core/widgets/greeting',
    type: Type.WIDGET,
    title: 'Greeting',
    Dashboard: widgets.Greeting,
    Settings: widgets.GreetingSettings,
  },
  {
    key: 'core/widgets/time',
    type: Type.WIDGET,
    title: 'Time',
    Dashboard: widgets.Time,
  },
];

plugins.map(registerPlugin);
