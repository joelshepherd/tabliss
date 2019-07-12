import Weather from './Weather';
import WeatherSettings from './WeatherSettings';

export default {
  type: 'widget/weather',
  kind: 'widget',
  title: 'Weather',
  Dashboard: Weather,
  Settings: WeatherSettings,
} as const;
