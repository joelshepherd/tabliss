import React, { FC, useLayoutEffect, useRef } from 'react';

import { Icon, RemoveIcon } from '../../../views/shared';
import { completeTodo, removeTodo, updateTodo } from './actions';
import { State } from './reducer';
import { Dispatch } from './types';
import './TodoItem.sass';

type Props = {
  dispatch: Dispatch;
  item: State[number];
};

const TodoItem: FC<Props> = ({ dispatch, item }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.innerText = item.contents;
    }
  }, [item.contents]);

  const handleBlur = () => {
    if (ref.current && ref.current.innerText !== item.contents) {
      dispatch(updateTodo(item.id, ref.current.innerText));
    }
  };
  const handleComplete = () => dispatch(completeTodo(item.id, !item.completed));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        event.currentTarget.blur();
        break;

      case 'Escape':
        // Reset contents on escape
        event.preventDefault();
        event.currentTarget.innerText = item.contents;
        event.currentTarget.blur();
        break;
    }
  };
  const handleRemove = () => dispatch(removeTodo(item.id));

  return (
    <div className="TodoItem">
      <span
        ref={ref}
        contentEditable
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      <a onMouseDown={handleComplete} className="complete">
        <Icon name={item.completed ? 'check-circle' : 'circle'} />
      </a>
      <a onMouseDown={handleRemove} className="delete">
        <RemoveIcon />
      </a>
    </div>
  );
};

export default TodoItem;
