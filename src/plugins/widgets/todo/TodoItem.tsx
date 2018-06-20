import * as React from 'react';
import { checkedIcon, uncheckedIcon } from '../../../app/ui';
import { Todo } from './interfaces';
import './TodoItem.sass';

interface Props {
  item: Todo;
  onToggle(id: string): void;
  onUpdate(id: string, contents: string): void;
}

class TodoItem extends React.Component<Props> {
  ref: HTMLSpanElement | null;

  shouldComponentUpdate(nextProps: Props) {
    if (! this.ref) {
      return true;
    }

    return nextProps.item.contents !== this.ref.innerText;
  }

  render() {
    const { item, onUpdate, onToggle } = this.props;

    return (
      <div className="TodoItem">
        <a onClick={() => onToggle(item.id)}>
          {item.completed ? checkedIcon : uncheckedIcon}
        </a>

        <span
          ref={ref => this.ref = ref}
          contentEditable={true}
          onBlur={event => onUpdate(item.id, event.currentTarget.innerText)}
          onInput={event => onUpdate(item.id, event.currentTarget.innerText)}
          onKeyDownCapture={this.onKeyDown}
          suppressContentEditableWarning={true}
        >
          {item.contents}
        </span>
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
