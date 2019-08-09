import { IntegrationConfig } from '../types';
import AsanaSettings from './AsanaSettings';
import middleware from './middleware';

const config: IntegrationConfig = {
  key: 'asana',
  name: 'Asana',
  middleware: middleware,
  settingsComponent: AsanaSettings,
};

export default config;
