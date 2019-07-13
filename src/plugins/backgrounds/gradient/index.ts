import { Plugin } from '../../types';
import Gradient from './Gradient';
import GradientSettings from './GradientSettings';

const config: Plugin = {
  key: 'background/gradient',
  kind: 'background',
  name: 'Colour Gradient',
  description: 'Add more splashes of colour.',
  Dashboard: Gradient,
  Settings: GradientSettings,
};

export default config;
