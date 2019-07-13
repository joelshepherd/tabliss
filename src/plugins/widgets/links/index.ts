import { Plugin } from '../../types';
import Links from './Links';
import LinksSettings from './LinksSettings';

const config: Plugin = {
  key: 'widget/links',
  kind: 'widget',
  name: 'Quick Links',
  description: 'I heard you like bookmarks.',
  Dashboard: Links,
  Settings: LinksSettings,
};

export default config;
