import { Config } from '../../types';
import Gradient from './Gradient';
import GradientSettings from './GradientSettings';

const config: Config = {
  key: 'background/gradient',
  name: 'Colour Gradient',
  description: 'Add more splashes of colour.',
  dashboardComponent: Gradient,
  settingsComponent: GradientSettings,
};

export default config;
