import * as React from 'react';
import { Settings as SettingsInterface } from '../../interfaces';
import { Engine } from './interfaces';
import { ChangeEvent } from 'react';
const engines: Engine[] = require('./engines.json');

interface Props {
  engine: string;
  placeholder: string;
  onChange: (settings: SettingsInterface) => void;
}

class SearchSettings extends React.PureComponent<Props> {
  static defaultProps = {
    engine: 'google',
  };

  render() {
    return (
      <div className="SearchSettings">
        <p>
          <label>
            Placeholder
            <input
              type="text"
              value={this.props.placeholder}
              onChange={event => this.props.onChange({ placeholder: event.target.value })}
              placeholder="Type to search"
            />
          </label>
        </p>

        <select onChange={(ev) => this.selectEngine(ev)} value={this.props.engine}>
          {engines.map((engine) =>
            <option key={engine.key} value={engine.key}>{engine.name}</option>
          )}
        </select>
      </div>
    );
  }

    private selectEngine(event: ChangeEvent<HTMLSelectElement>) {
        const engine = engines.filter((eng) => {
            return eng.key === event.currentTarget.value;
        })[0].key;
        this.props.onChange({ engine });
  }
}

export default SearchSettings;
