import * as React from 'react';

interface Props {
  name?: string;
  onChange: (settings: {[name: string]: any}) => void;
}

class GreetingSettings extends React.Component<Props> {
  static defaultProps = {
    name: 'Human',
  };

  render() {
    return (
      <div>
        <label>
          Name
          <input
            type="text"
            value={this.props.name}
            onChange={event => this.props.onChange({ name: event.target.value })}
          />
        </label>
      </div>
    );
  }
}

export default GreetingSettings;
