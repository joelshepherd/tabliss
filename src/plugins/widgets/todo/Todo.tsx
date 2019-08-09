import React, { FC, useCallback } from 'react';

import { useSavedReducer, useToggle } from '../../../hooks';
import { DownIcon, Icon, UpIcon } from '../../../views/shared';
import { useIntegration } from './integrations';
import { reducer, State } from './reducer';
import { Props, defaultData } from './types';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Todo: FC<Props> = ({ data = defaultData, setData }) => {
  const [showCompleted, toggleCompleted] = useToggle();
  const [showMore, toggleMore] = useToggle();

  const setItems = (items: State) => setData({ ...data, items });
  const dispatch = useSavedReducer(reducer, data.items, setItems);
  const integratedDispatch = useIntegration(
    dispatch,
    data.integration,
    integration => setData({ ...data, integration }),
  );

  const items = data.items.filter(item => !item.completed || showCompleted);
  const show = !showMore ? data.show : undefined;

  return (
    <div className="Todo">
      <div>
        <TodoInput dispatch={integratedDispatch} />
        &nbsp;
        <a onClick={toggleCompleted}>
          <Icon name={showCompleted ? 'check-circle' : 'circle'} />
        </a>
        &nbsp;
        {items.length > data.show && (
          <a onClick={toggleMore}>{showMore ? <UpIcon /> : <DownIcon />}</a>
        )}
      </div>

      <TodoList dispatch={integratedDispatch} items={items} show={show} />
    </div>
  );
};

export default Todo;
