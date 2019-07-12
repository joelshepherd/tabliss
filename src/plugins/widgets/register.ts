import { registerPlugin } from '../registry';

import { Css, CssSettings } from './css';
import { Greeting, GreetingSettings } from './greeting';
import { Js, JsSettings } from './js';
import { Links, LinksSettings } from './links';
import { Message, MessageSettings } from './message';
import { LiteratureClock, LiteratureClockSettings } from './literature-clock';
import { Quote, QuoteSettings } from './quote';
import { Search, SearchSettings } from './search';
import { Time, TimeSettings } from './time';
import { Todo, TodoSettings } from './todo';
import { Weather, WeatherSettings } from './weather';

registerPlugin({
  key: 'widget/css',
  type: 'widget',
  title: 'Custom CSS',
  Dashboard: Css,
  Settings: CssSettings,
});

registerPlugin({
  key: 'widget/greeting',
  type: 'widget',
  title: 'Greeting',
  Dashboard: Greeting,
  Settings: GreetingSettings,
});

// Only available on the web version due to extension's CSP
if (process.env.BUILD_TARGET === 'web') {
  registerPlugin({
    key: 'widget/js',
    type: 'widget',
    title: 'Custom JS',
    Dashboard: Js,
    Settings: JsSettings,
  });
}

registerPlugin({
  key: 'widget/links',
  type: 'widget',
  title: 'Quick Links',
  Dashboard: Links,
  Settings: LinksSettings,
});

registerPlugin({
  key: 'widget/message',
  type: 'widget',
  title: 'Message',
  Dashboard: Message,
  Settings: MessageSettings,
});

registerPlugin({
  key: 'widget/quote',
  type: 'widget',
  title: 'Daily Quotes',
  Dashboard: Quote,
  Settings: QuoteSettings,
});

registerPlugin({
  key: 'widget/search',
  type: 'widget',
  title: 'Search Box',
  Dashboard: Search,
  Settings: SearchSettings,
});

registerPlugin({
  key: 'widget/time',
  type: 'widget',
  title: 'Time',
  Dashboard: Time,
  Settings: TimeSettings,
});

registerPlugin({
  key: 'widget/literature-clock',
  type: 'widget',
  title: 'Literature Clock',
  Dashboard: LiteratureClock,
  Settings: LiteratureClockSettings,
});

registerPlugin({
  key: 'widget/todo',
  type: 'widget',
  title: 'Todos',
  Dashboard: Todo,
  Settings: TodoSettings,
});

registerPlugin({
  key: 'widget/weather',
  type: 'widget',
  title: 'Weather',
  Dashboard: Weather,
  Settings: WeatherSettings,
});
