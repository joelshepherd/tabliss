import { Config } from '../../types';
import Links from './Links';
import LinksSettings from './LinksSettings';

const config: Config = {
  key: 'widget/links',
  name: 'Quick Links',
  description: 'I heard you like bookmarks.',
  dashboardComponent: Links,
  settingsComponent: LinksSettings,
};

export default config;
