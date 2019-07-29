import { Plugin } from '../../types';
import Quote from './Quote';
import QuoteSettings from './QuoteSettings';

const config: Plugin = {
  key: 'widget/quote',
  name: 'Daily Quotes',
  description: 'If you like to be inspired (or not - there are categories).',
  Dashboard: Quote,
  Settings: QuoteSettings,
};

export default config;
