import * as React from 'react';
import { Settings } from '../../interfaces';

interface State {
  input: string;
}

interface Props {
  input: string;
  onChange: (settings: Settings) => void;
}

class JsSettings extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    input: ''
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      input: props.input
    };
  }

  render() {
    return (
      <div className="JsSettings">
        <label>
          JavaScript Snippet
          <textarea
            rows={3}
            style={{ fontFamily: 'monospace' }}
            value={this.state.input}
            onChange={event => this.setState({input: event.target.value})}
          />
        </label>

        <button
          className="button--primary"
          onClick={() => this.props.onChange({input: this.state.input})}>
          Save & Run
        </button>

        <p className="info">
          <b>Warning:</b> this functionality is intended for advanced users.
          Please make sure you know what you are doing, snippets could lead to security vulnerabilities.
          The snippet will run once after the dashboard has loaded.
          Persisting event listeners will not be removed when reruning the snippet.
        </p>
      </div>
    );
  }
}

export default JsSettings;
