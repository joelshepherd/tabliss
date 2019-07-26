import React, { FC, useState } from 'react';

import { ExpandIcon } from '../../../views/shared';
import { useToggle } from '../../../utils/useToggle';
import './TodoInput.sass';

type Props = {
  onCreate(contents: string): void;
};

const TodoInput: FC<Props> = ({ onCreate }) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const [contents, setContents] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contents !== '') {
      onCreate(contents);
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
