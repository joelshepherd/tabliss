import { Config } from '../../types';
import Iframe from './Iframe';
import IframeSettings from './IframeSettings';

const config: Config = {
  key: 'widget/iframe',
  name: 'Embed Web page',
  description: 'Embed a website into a widget',
  dashboardComponent: Iframe,
  settingsComponent: IframeSettings,
};

export default config;
