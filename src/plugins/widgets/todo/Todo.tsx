import React, { FC } from 'react';

import { useSavedReducer, useToggle } from '../../../hooks';
import { DownIcon, Icon, UpIcon } from '../../../views/shared';
import { addTodo, removeTodo, toggleTodo, updateTodo } from './actions';
import { reducer, State } from './reducer';
import { Props, defaultData } from './types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { useAsana } from './integrations/asana/useAsana';

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleShowCompleted] = useToggle();
  const [showMore, toggleShowMore] = useToggle();

  const setItems = (items: State) => setData({ ...data, items });
  const baseDispatch = useSavedReducer(reducer, data.items, setItems);

  const items = data.items.filter(item => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  const listener = useAsana(
    data.integration ? data.integration.data : undefined,
    integrationData =>
      setData({
        ...data,
        integration: { ...data.integration, data: integrationData },
      }),
    items => setData({ ...data, items }),
  );

  const dispatch = (action: any) => {
    baseDispatch(action);
    listener(action);
  };

  return (
    <div className="Todo">
      <TodoList
        items={items}
        onToggle={(...args) => dispatch(toggleTodo(...args))}
        onUpdate={(...args) => dispatch(updateTodo(...args))}
        onRemove={(...args) => dispatch(removeTodo(...args))}
        show={show}
      />

      <div>
        <TodoInput onCreate={(...args) => dispatch(addTodo(...args))} />{' '}
        <a onClick={toggleShowCompleted}>
          <Icon name={showCompleted ? 'check-circle' : 'circle'} />
        </a>{' '}
        {items.length > data.show && (
          <a onClick={toggleShowMore}>{showMore ? <UpIcon /> : <DownIcon />}</a>
        )}
      </div>
    </div>
  );
};

export default Todo;
