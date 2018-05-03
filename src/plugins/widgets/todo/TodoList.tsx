import * as React from 'react';
import { Todo } from './interfaces';
import TodoItem from './TodoItem';

interface Props {
  items: Todo[];
  onToggle(id: string): void;
}

const TodoList: React.StatelessComponent<Props> = ({ items, onToggle }) => (
  <div className="TodoList">
    {items
      .filter(item => ! item.completed)
      .map(item => <TodoItem key={item.id} item={item} onToggle={onToggle} />)
    }
  </div>
);

export default TodoList;
