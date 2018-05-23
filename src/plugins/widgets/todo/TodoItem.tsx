import * as React from 'react';
import { checkedIcon, uncheckedIcon } from '../../../app/ui';
import { Todo } from './interfaces';
import './TodoItem.sass';

interface Props {
  item: Todo;
  onToggle(id: string): void;
}

const TodoItem: React.StatelessComponent<Props> = ({ item, onToggle }) => (
  <div className="TodoItem">
    <a onClick={() => onToggle(item.id)}>
      {item.completed ? checkedIcon : uncheckedIcon}
    </a>

    {item.contents}
  </div>
);

export default TodoItem;
