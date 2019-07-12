import Todo from './Todo';
import TodoSettings from './TodoSettings';

export default {
  type: 'widget/todo',
  kind: 'widget',
  title: 'Todos',
  Dashboard: Todo,
  Settings: TodoSettings,
} as const;
