import { Config } from '../../types';
import Image from './Image';
import ImageSettings from './ImageSettings';

const config: Config = {
  key: 'background/image',
  name: 'Upload Images',
  description: 'See your own images.',
  dashboardComponent: Image,
  settingsComponent: ImageSettings,
  supportsBackdrop: true,
};

export default config;
