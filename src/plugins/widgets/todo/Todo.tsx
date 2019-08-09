import React, { FC, useCallback } from 'react';

import { useSavedReducer, useToggle } from '../../../hooks';
import { DownIcon, Icon, UpIcon } from '../../../views/shared';
import { useIntegration } from './integrations';
import { reducer, State } from './reducer';
import { Dispatch, Props, defaultData } from './types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleShowCompleted] = useToggle();
  const [showMore, toggleShowMore] = useToggle();

  const setItems = (items: State) => setData({ ...data, items });
  const dispatch = useSavedReducer(reducer, data.items, setItems);
  const listener = useIntegration(
    data.integration,
    integration => setData({ ...data, integration }),
    setItems,
  );

  const dispatchWithListener: Dispatch = useCallback(
    action => {
      dispatch(action);
      if (listener) listener(action);
    },
    [dispatch, listener],
  );

  const items = data.items.filter(item => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  return (
    <div className="Todo">
      <TodoList dispatch={dispatchWithListener} items={items} show={show} />

      <div>
        <TodoInput dispatch={dispatchWithListener} />
        &nbsp;
        <a onClick={toggleShowCompleted}>
          <Icon name={showCompleted ? 'check-circle' : 'circle'} />
        </a>
        &nbsp;
        {items.length > data.show && (
          <a onClick={toggleShowMore}>{showMore ? <UpIcon /> : <DownIcon />}</a>
        )}
      </div>
    </div>
  );
};

export default Todo;
