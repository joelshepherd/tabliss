import React, { FC, useReducer, useEffect } from 'react';

import {
  arrowDownIcon,
  arrowUpIcon,
  checkedIcon,
  uncheckedIcon,
} from '../../../views/shared';
import { useToggle } from '../../../utils/useToggle';
import { addTodo, removeTodo, toggleTodo, updateTodo } from './actions';
import { reducer } from './reducer';
import { Props, defaultData } from './types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleShowCompleted] = useToggle();
  const [showMore, toggleShowMore] = useToggle();

  const [state, dispatch] = useReducer(reducer, data.items);
  useEffect(() => {
    setData({ ...data, items: state });
  }, [state]);

  const items = data.items.filter(item => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  return (
    <div className={`Todo align-${data.textAlign}`}>
      {items.length > 0 && (
        <TodoList
          items={items}
          onToggle={(...args) => dispatch(toggleTodo(...args))}
          onUpdate={(...args) => dispatch(updateTodo(...args))}
          onRemove={(...args) => dispatch(removeTodo(...args))}
          show={show}
        />
      )}

      <div>
        <TodoInput onCreate={(...args) => dispatch(addTodo(...args))} />{' '}
        <a onClick={toggleShowCompleted}>
          {showCompleted ? checkedIcon : uncheckedIcon}
        </a>{' '}
        {items.length > data.show && (
          <a onClick={toggleShowMore}>
            {showMore ? arrowUpIcon : arrowDownIcon}
          </a>
        )}
      </div>
    </div>
  );
};

export default Todo;
