import React, { FC, useLayoutEffect, useRef } from 'react';

import { useKeyPress } from '../../../utils/useKeyPress';
import { checkedIcon, uncheckedIcon, removeIcon } from '../../../views/shared';
import { State } from './reducer';
import './TodoItem.sass';

interface Props {
  item: State[number];
  onToggle(): void;
  onUpdate(contents: string): void;
  onDelete(): void;
}

const TodoItem: FC<Props> = ({ item, onDelete, onUpdate, onToggle }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.innerText = item.contents;
    }
  }, [item.contents]);

  useKeyPress(
    event => {
      if (event.target === ref.current) {
        event.preventDefault();

        if (ref.current) {
          ref.current.blur();
        }
      }
    },
    ['Enter'],
    false,
  );

  useKeyPress(
    event => {
      if (event.target === ref.current) {
        event.preventDefault();

        if (ref.current) {
          // Reset contents on escape
          ref.current.innerText = item.contents;
          ref.current.blur();
        }
      }
    },
    ['Escape'],
    false,
  );

  return (
    <div className="TodoItem">
      <a onClick={onToggle}>{item.completed ? checkedIcon : uncheckedIcon}</a>

      <span
        ref={ref}
        contentEditable={true}
        onBlur={event => onUpdate(event.currentTarget.innerText)}
      />

      <a onClick={onDelete} className="delete">
        {removeIcon}
      </a>
    </div>
  );
};

export default TodoItem;
