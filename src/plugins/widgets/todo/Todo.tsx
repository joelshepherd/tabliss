import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { arrowDownIcon, arrowUpIcon } from '../../../app/ui';
import { PluginAPI } from '../../interfaces';
import { Settings, Todo as TodoModel } from './interfaces';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

interface Props extends Settings {
  local: {
    items: TodoModel[];
  };
}

interface State {
  more: boolean;
}

class Todo extends React.PureComponent<Props & PluginAPI, State> {
  static defaultProps: Props = {
    local: {
      items: [],
    },
    show: 3,
    textAlign: 'inherit',
  };

  state: State = {
    more: false,
  };

  render() {
    const items = this.props.local.items.filter(item => ! item.completed);
    const show = ! this.state.more ? this.props.show : undefined;

    return (
      <div className="Todo" style={{ textAlign: this.props.textAlign }}>
        <TodoList items={items} onToggle={this.onToggle} onUpdate={this.onUpdate} show={show} />
        <TodoInput onCreate={this.onCreate} />
        {items.length > this.props.show && (
          <a onClick={this.onMore}>{this.state.more ? arrowUpIcon : arrowDownIcon}</a>
        )}
      </div>
    );
  }

  /**
   * Handle on create todo events.
   */
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

  /**
   * Handle on more events.
   */
  private onMore = () => this.setState({ more: ! this.state.more });

  /**
   * Handle on toggle events.
   */
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

  /**
   * Handle update todo events.
   */
  private onUpdate = (id: string, contents: string) => {
    this.props.setLocal({
      items: this.props.local.items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            contents,
          };
        }

        return item;
      }),
    });
  }
}

export default Todo;
