import * as React from 'react';
import { checkedIcon, uncheckedIcon, removeIcon } from '../../../app/ui';
import { Todo } from './interfaces';
import './TodoItem.sass';

interface Props {
  item: Todo;
  onToggle(): void;
  onUpdate(contents: string): void;
  onDelete(): void;
}

class TodoItem extends React.Component<Props> {
  ref: HTMLSpanElement | null;

  shouldComponentUpdate(nextProps: Props) {
    if (! this.ref) {
      return true;
    }

    return (
      nextProps.item.id !== this.props.item.id ||
      nextProps.item.completed !== this.props.item.completed ||
      nextProps.item.contents !== this.ref.innerText
    );
  }

  render() {
    const { item, onDelete, onUpdate, onToggle } = this.props;

    return (
      <div className="TodoItem">
        <a onClick={onToggle}>
          {item.completed ? checkedIcon : uncheckedIcon}
        </a>

        <span
          ref={ref => this.ref = ref}
          contentEditable={true}
          onBlur={event => onUpdate(event.currentTarget.innerText)}
          onInput={event => onUpdate(event.currentTarget.innerText)}
          onKeyDownCapture={this.onKeyDown}
          suppressContentEditableWarning={true}
        >
          {item.contents}
        </span>

        <a onClick={onDelete} className="delete">{removeIcon}</a>
      </div>
    );
  }

  private onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    // Did we press enter while editing?
    if (event.keyCode === 13 && this.ref) {
      event.preventDefault();
      this.ref.blur();
    }
  }
}

export default TodoItem;
