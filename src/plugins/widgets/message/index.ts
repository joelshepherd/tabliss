import { Plugin } from '../../types';
import Message from './Message';
import MessageSettings from './MessageSettings';

const config: Plugin = {
  key: 'widget/message',
  name: 'Message',
  description: 'Add your own text.',
  Dashboard: Message,
  Settings: MessageSettings,
};

export default config;
