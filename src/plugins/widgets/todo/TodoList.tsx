import React, { FC } from 'react';
import { State } from './reducer';
import TodoItem from './TodoItem';
import './TodoList.sass';

interface Props {
  items: State;
  show?: number;
  onToggle(id: string): void;
  onUpdate(id: string, contents: string): void;
  onRemove(id: string): void;
}

const TodoList: FC<Props> = ({ items, onToggle, onUpdate, onRemove, show }) => (
  <div className="TodoList">
    {items.slice(0, show).map(item => (
      <TodoItem
        key={item.id}
        item={item}
        onToggle={() => onToggle(item.id)}
        onUpdate={contents => onUpdate(item.id, contents)}
        onDelete={() => onRemove(item.id)}
      />
    ))}
  </div>
);

export default TodoList;
