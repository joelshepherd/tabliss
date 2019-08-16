import { Config } from '../../types';
import Css from './Css';
import CssSettings from './CssSettings';

const config: Config = {
  key: 'widget/css',
  name: 'Custom CSS',
  description: 'Make your new tab more style-ish (advanced users).',
  dashboardComponent: Css,
  settingsComponent: CssSettings,
};

export default config;
