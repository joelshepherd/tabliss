import { Plugin, Type } from '../constants';
import { registerPlugin } from '../registry';
import * as backgrounds from './Backgrounds';
import * as widgets from './Widgets';

const plugins: Plugin[] = [
  {
    key: 'core/backgrounds/colour',
    type: Type.BACKGROUND,
    title: 'Colour background',
    Dashboard: backgrounds.Colour,
    Settings: backgrounds.ColourSettings,
  },
  {
    key: 'core/backgrounds/gradient',
    type: Type.BACKGROUND,
    title: 'Gradient background',
    Dashboard: backgrounds.Gradient,
    Settings: backgrounds.GradientSettings,
  },
  {
    key: 'core/widgets/greeting',
    type: Type.WIDGET,
    title: 'Greeting widget',
    Dashboard: widgets.Greeting,
    Settings: widgets.GreetingSettings,
  },
  {
    key: 'core/widgets/time',
    type: Type.WIDGET,
    title: 'Time widget',
    Dashboard: widgets.Time,
  },
]

plugins.map(registerPlugin);
