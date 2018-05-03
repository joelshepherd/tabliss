import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { PluginAPI } from '../../interfaces';
import { Todo as TodoModel } from './interfaces';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

interface Props extends PluginAPI {
  local: {
    items: TodoModel[];
  };
}

class Todo extends React.PureComponent<Props> {
  static defaultProps = {
    local: {
      items: [],
    },
  };

  render() {
    const { items } = this.props.local;

    return (
      <div className="Todo">
        <TodoList items={items} onToggle={this.onToggle} />
        <TodoInput onCreate={this.onCreate} />
      </div>
    );
  }

  private onCreate = (contents: string) => {
    this.props.setLocal({
      items: [
        ...this.props.local.items,
        {
          contents,
          id: uuid(),
          complete: false,
        },
      ],
    });
  }

  private onToggle = (id: string) => {
    this.props.setLocal({
      items: this.props.local.items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: ! item.completed,
          };
        }

        return item;
      }),
    });
  }
}

export default Todo;
