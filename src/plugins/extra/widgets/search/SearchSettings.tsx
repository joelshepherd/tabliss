import * as React from 'react';
import { Settings as SettingsInterface } from '../../../interfaces';

interface Props {
  engine: string;
  onChange: (settings: SettingsInterface) => void;
}

class SearchSettings extends React.PureComponent<Props> {
  static defaultProps = { engine: 'google' };

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            checked={this.props.engine === 'google'}
            onChange={event => this.props.onChange({ engine: 'google' })}
          />
          {' '}
          Google
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.engine === 'bing'}
            onChange={event => this.props.onChange({ engine: 'bing' })}
          />
          {' '}
          Bing
        </label>
      </div>
    );
  }
}

export default SearchSettings;
