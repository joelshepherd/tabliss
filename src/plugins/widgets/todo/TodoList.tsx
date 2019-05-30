import * as React from 'react';
import { Todo } from './interfaces';
import TodoItem from './TodoItem';
import './TodoList.sass';

interface Props {
  items: Todo[];
  show?: number;
  onToggle(id: string): void;
  onUpdate(id: string, contents: string): void;
  onDelete(id: string): void;
}

const TodoList: React.StatelessComponent<Props> = ({
  items,
  onToggle,
  onUpdate,
  onDelete,
  show,
}) => (
  <div className="TodoList">
    {items.slice(0, show).map(item => (
      <TodoItem
        key={item.id}
        item={item}
        onToggle={() => onToggle(item.id)}
        onUpdate={(contents: string) => onUpdate(item.id, contents)}
        onDelete={() => onDelete(item.id)}
      />
    ))}
  </div>
);

export default TodoList;
