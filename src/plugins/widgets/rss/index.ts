import { Config } from '../../types';
import Quote from './Rss';
import QuoteSettings from './RssSettings';

const config: Config = {
  key: 'widget/rss',
  name: 'RSS Feed',
  description: "Be inspired by your own choosen feed.",
  dashboardComponent: Quote,
  settingsComponent: QuoteSettings,
};

export default config;
