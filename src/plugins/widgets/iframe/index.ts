import { Config } from '../../types';
import Iframe from './Iframe';
import IframeSettings from './IframeSettings';

const config: Config = {
  key: 'widget/iframe',
  name: 'Iframe',
  description: 'Create your own component with a website (advanced users).',
  dashboardComponent: Iframe,
  settingsComponent: IframeSettings,
};

export default config;
