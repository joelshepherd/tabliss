import Links from './Links';
import LinksSettings from './LinksSettings';

export default {
  type: 'widget/links',
  kind: 'widget',
  title: 'Quick Links',
  Dashboard: Links,
  Settings: LinksSettings,
} as const;
