import { Plugin } from '../../types';
import Image from './Image';
import ImageSettings from './ImageSettings';

const config: Plugin = {
  key: 'background/image',
  name: 'Upload Images',
  description: 'See your own images.',
  Dashboard: Image,
  Settings: ImageSettings,
  supportsBackdrop: true,
};

export default config;
