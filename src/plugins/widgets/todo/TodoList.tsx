import * as React from 'react';
import { Todo } from './interfaces';
import TodoItem from './TodoItem';

interface Props {
  items: Todo[];
  show?: number;
  onToggle(id: string): void;
}

const TodoList: React.StatelessComponent<Props> = ({ items, onToggle, show }) => (
  <div className="TodoList">
    {items
      .slice(0, show)
      .map(item => (
        <TodoItem key={item.id} item={item} onToggle={onToggle} />
      ))
    }
  </div>
);

export default TodoList;
