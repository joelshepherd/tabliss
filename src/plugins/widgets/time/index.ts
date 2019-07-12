import Time from './Time';
import TimeSettings from './TimeSettings';

export default {
  type: 'widget/time',
  kind: 'widget',
  title: 'Time',
  Dashboard: Time,
  Settings: TimeSettings,
} as const;
