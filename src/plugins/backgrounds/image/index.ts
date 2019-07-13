import { Plugin } from '../../types';
import Image from './Image';
import ImageSettings from './ImageSettings';

const config: Plugin = {
  key: 'background/image',
  kind: 'background',
  name: 'Upload Images',
  description: 'See your own images.',
  Dashboard: Image,
  Settings: ImageSettings,
};

export default config;
