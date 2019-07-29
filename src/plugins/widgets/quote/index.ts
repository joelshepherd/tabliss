import { Config } from '../../types';
import Quote from './Quote';
import QuoteSettings from './QuoteSettings';

const config: Config = {
  key: 'widget/quote',
  name: 'Daily Quotes',
  description: 'If you like to be inspired (or not - there are categories).',
  dashboardComponent: Quote,
  settingsComponent: QuoteSettings,
};

export default config;
