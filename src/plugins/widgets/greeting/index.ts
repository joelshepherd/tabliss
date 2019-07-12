import Greeting from './Greeting';
import GreetingSettings from './GreetingSettings';

export default {
  type: 'widget/greeting',
  kind: 'widget',
  title: 'Greeting',
  Dashboard: Greeting,
  Settings: GreetingSettings,
} as const;
