import Gradient from './Gradient';
import GradientSettings from './GradientSettings';

export default {
  type: 'background/gradient',
  kind: 'background',
  title: 'Colour Gradient',
  Dashboard: Gradient,
  Settings: GradientSettings,
} as const;
