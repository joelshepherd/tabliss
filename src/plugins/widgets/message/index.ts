import { Config } from '../../types';
import Message from './Message';
import MessageSettings from './MessageSettings';

const config: Config = {
  key: 'widget/message',
  name: 'Message',
  description: 'Add your own text.',
  dashboardComponent: Message,
  settingsComponent: MessageSettings,
};

export default config;
