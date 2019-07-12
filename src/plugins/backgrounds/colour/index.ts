import Colour from './Colour';
import ColourSettings from './ColourSettings';

export default {
  type: 'background/colour',
  kind: 'background',
  title: 'Solid Colour',
  Dashboard: Colour,
  Settings: ColourSettings,
} as const;
