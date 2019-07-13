import { Plugin } from '../../types';
import Todo from './Todo';
import TodoSettings from './TodoSettings';

const config: Plugin = {
  key: 'widget/todo',
  kind: 'widget',
  name: 'Todos',
  description: 'Add reminders to procrastinate.',
  Dashboard: Todo,
  Settings: TodoSettings,
};

export default config;
