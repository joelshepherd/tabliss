import * as React from 'react';
import { Settings as SettingsInterface } from '../../../interfaces';
import { Engine } from './interfaces';
const engines: Engine[] = require('./engines.json');

interface Props {
  engine: string;
  onChange: (settings: SettingsInterface) => void;
}

class SearchSettings extends React.PureComponent<Props> {
  static defaultProps = { engine: 'google' };

  render() {
    return (
      <div>
        {engines.map(engine =>
          <label key={engine.key}>
            <input
              type="radio"
              checked={this.props.engine === engine.key}
              onChange={() => this.selectEngine(engine.key)}
            />
            {' '}
            {engine.name}
          </label>
        )}
      </div>
    );
  }

  private selectEngine(engine: string) {
    this.props.onChange({ engine });
  }
}

export default SearchSettings;
