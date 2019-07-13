import { Plugin } from '../../types';
import Weather from './Weather';
import WeatherSettings from './WeatherSettings';

const config: Plugin = {
  key: 'widget/weather',
  kind: 'widget',
  name: 'Weather',
  description: 'Add a window to your new tab.',
  Dashboard: Weather,
  Settings: WeatherSettings,
};

export default config;
