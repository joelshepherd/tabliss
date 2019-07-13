import { Plugin } from '../../types';
import Colour from './Colour';
import ColourSettings from './ColourSettings';

const config: Plugin = {
  key: 'background/colour',
  kind: 'background',
  name: 'Solid Colour',
  description: 'Add a splash of colour.',
  Dashboard: Colour,
  Settings: ColourSettings,
};

export default config;
