import { Config } from '../../types';
import Weather from './Weather';
import WeatherSettings from './WeatherSettings';

const config: Config = {
  key: 'widget/weather',
  name: 'Weather',
  description: 'Add a window to your new tab.',
  dashboardComponent: Weather,
  settingsComponent: WeatherSettings,
};

export default config;
