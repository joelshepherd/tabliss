import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { arrowDownIcon, arrowUpIcon, checkedIcon, uncheckedIcon } from '../../../app/ui';
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
  showCompleted: boolean;
  showMore: boolean;
}

class Todo extends React.PureComponent<Props & PluginAPI, State> {
  static defaultProps: Props = {
    local: {
      items: [],
    },
    show: 3,
    textAlign: 'left',
  };

  state: State = {
    showCompleted: false,
    showMore: false,
  };

  render() {
    const items = this.props.local.items.filter(item => ! item.completed || this.state.showCompleted);
    const show = ! this.state.showMore ? this.props.show : undefined;

    return (
      <div className={`Todo align-${this.props.textAlign}`}>
        {items.length > 0 && (
          <TodoList
            items={items}
            onToggle={this.onToggle}
            onUpdate={this.onUpdate}
            onDelete={this.onDelete}
            show={show}
          />
        )}

        <div>
          <TodoInput onCreate={this.onCreate} />
          {' '}
          <a onClick={this.onShowCompleted}>{this.state.showCompleted ? checkedIcon : uncheckedIcon}</a>
          {' '}
          {items.length > this.props.show && (
            <a onClick={this.onShowMore}>{this.state.showMore ? arrowUpIcon : arrowDownIcon}</a>
          )}
        </div>
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
   * Handle on show more events.
   */
  private onShowMore = () => this.setState({ showMore: ! this.state.showMore });

  /**
   * Handle on show completed events.
   */
  private onShowCompleted = () => this.setState({ showCompleted: ! this.state.showCompleted });

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

  /**
   * Handle delete todo events.
   */
  private onDelete = (id: string) => {
    this.props.setLocal({
      items: this.props.local.items.filter(item => item.id !== id),
    });
  }
}

export default Todo;
