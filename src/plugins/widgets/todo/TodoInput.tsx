import * as React from 'react';
import { expandIcon } from '../../../app/ui';
import './TodoInput.sass';

interface Props {
  onCreate(contents: string): void;
}

interface State {
  contents: string;
  open: boolean;
}

class TodoInput extends React.PureComponent<Props, State> {
  state: State = {
    contents: '',
    open: false,
  };

  render() {
    return (
      <span className="TodoInput">
        {this.state.open && (
          <form onSubmit={this.onSubmit}>
            <label>
              <input
                type="text"
                autoFocus={true}
                value={this.state.contents}
                onBlur={this.onClose}
                onChange={this.onChange}
              />
            </label>
          </form>
        )}

        {! this.state.open && (
          <a onClick={this.onOpen}>{expandIcon}</a>
        )}
      </span>
    );
  }

  handleClickOutside() {
    this.onClose();
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ contents: event.target.value });
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.contents) {
      this.props.onCreate(this.state.contents);
    }

    this.setState({
      contents: '',
      open: false,
    });
  }

  private onOpen = () => {
    this.setState({ open: true });
  }

  private onClose = () => {
    this.setState({ open: false });
  }
}

export default TodoInput;
