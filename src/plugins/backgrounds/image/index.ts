import Image from './Image';
import ImageSettings from './ImageSettings';

export default {
  type: 'background/image',
  kind: 'background',
  title: 'Upload Images',
  Dashboard: Image,
  Settings: ImageSettings,
} as const;
