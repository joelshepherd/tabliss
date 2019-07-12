import Css from './Css';
import CssSettings from './CssSettings';

export default {
  type: 'widget/css',
  kind: 'widget',
  title: 'Custom CSS',
  Dashboard: Css,
  Settings: CssSettings,
} as const;
