import React, { FC } from 'react';

import { State } from './reducer';
import TodoItem from './TodoItem';
import './TodoList.sass';
import { Dispatch } from './types';

interface Props {
  dispatch: Dispatch;
  items: State;
  show?: number;
}

const TodoList: FC<Props> = ({ dispatch, items, show }) => (
  <div className="TodoList">
    {items.slice(0, show).map(item => (
      <TodoItem key={item.id} item={item} dispatch={dispatch} />
    ))}
  </div>
);

export default TodoList;
