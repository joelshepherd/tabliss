import { Config } from '../../types';
import Quote from './Quote';
import QuoteSettings from './QuoteSettings';

const config: Config = {
  key: 'widget/quote',
  name: 'Quotes',
  description: "Be inspired (or not, there's categories).",
  dashboardComponent: Quote,
  settingsComponent: QuoteSettings,
};

export default config;
