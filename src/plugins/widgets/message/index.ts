import Message from './Message';
import MessageSettings from './MessageSettings';

export default {
  type: 'widget/message',
  kind: 'widget',
  title: 'Message',
  Dashboard: Message,
  Settings: MessageSettings,
} as const;
