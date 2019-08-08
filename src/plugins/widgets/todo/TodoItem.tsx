import React, { FC, useLayoutEffect, useRef } from 'react';

import { useKeyPress } from '../../../hooks';
import { Icon, RemoveIcon } from '../../../views/shared';
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

  const handleBlur = () => {
    if (ref.current) {
      if (ref.current.innerText !== item.contents) {
        onUpdate(ref.current.innerText);
      }
    }
  };

  return (
    <div className="TodoItem">
      <span ref={ref} contentEditable onBlur={handleBlur} />

      <a onMouseDown={onToggle} className="complete">
        <Icon name={item.completed ? 'check-circle' : 'circle'} />
      </a>
      <a onMouseDown={onDelete} className="delete">
        <RemoveIcon />
      </a>
    </div>
  );
};

export default TodoItem;
