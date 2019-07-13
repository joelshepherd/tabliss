import { Plugin } from '../../types';
import Css from './Css';
import CssSettings from './CssSettings';

const config: Plugin = {
  key: 'widget/css',
  kind: 'widget',
  name: 'Custom CSS',
  description: 'Make your new tab more style-ish (advanced users).',
  Dashboard: Css,
  Settings: CssSettings,
};

export default config;
