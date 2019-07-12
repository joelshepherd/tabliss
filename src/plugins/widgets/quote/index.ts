import Quote from './Quote';
import QuoteSettings from './QuoteSettings';

export default {
  type: 'widget/quote',
  kind: 'widget',
  title: 'Daily Quotes',
  Dashboard: Quote,
  Settings: QuoteSettings,
} as const;
