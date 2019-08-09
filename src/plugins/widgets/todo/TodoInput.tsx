import React, { FC, useState } from 'react';

import { useToggle } from '../../../hooks';
import { ExpandIcon } from '../../../views/shared';
import { addTodo } from './actions';
import { Dispatch } from './types';
import './TodoInput.sass';

type Props = {
  dispatch: Dispatch;
};

const TodoInput: FC<Props> = ({ dispatch }) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const [contents, setContents] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contents !== '') {
      dispatch(addTodo(contents));
    }

    setContents('');
    toggleIsOpen();
  };

  return (
    <span className="TodoInput">
      {!isOpen && (
        <a onClick={toggleIsOpen}>
          <ExpandIcon />
        </a>
      )}

      {isOpen && (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              autoFocus={true}
              type="text"
              value={contents}
              onBlur={toggleIsOpen}
              onChange={event => setContents(event.target.value)}
            />
          </label>
        </form>
      )}
    </span>
  );
};

export default TodoInput;
