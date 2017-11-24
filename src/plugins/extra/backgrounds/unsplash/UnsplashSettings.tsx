import * as React from 'react';
import { defaultProps } from './constants';
import { By, Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class UnsplashSettings extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    return (
      <div>
        <label>
          Show a new photo
          <select
            value={this.props.timeout}
            onChange={event => this.props.onChange({ timeout: parseInt(event.target.value, 10) })}
          >
            <option value="0">Every new tab</option>
            <option value="900">Every 15 minutes</option>
            <option value="3600">Every hour</option>
            <option value="86400">Every day</option>
            <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.by === By.OFFICIAL}
            onChange={event => this.props.onChange({ by: By.OFFICIAL })}
          />
          {' '}
          Official collection
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.by === By.COLLECTIONS}
            onChange={event => this.props.onChange({ by: By.COLLECTIONS })}
          />
          {' '}
          Custom collection
        </label>

        {this.props.by === By.COLLECTIONS &&
          <label>
            Collection
            <input
              placeholder="Collection ID number"
              type="text"
              value={this.props.collections}
              onChange={event => this.props.onChange({ collections: event.target.value })}
            />
          </label>
        }

        <label>
          <input
            type="radio"
            checked={this.props.by === By.SEARCH}
            onChange={event => this.props.onChange({ by: By.SEARCH })}
          />
          {' '}
          Custom search
        </label>

        {this.props.by === By.SEARCH &&
          <div>
            <label>
              Tags
              <input
                placeholder="Try landscapes or animals..."
                type="text"
                value={this.props.search}
                onChange={event => this.props.onChange({ search: event.target.value })}
              />
            </label>

            <label>
              <input
                type="checkbox"
                checked={this.props.featured}
                onChange={event => this.props.onChange({ featured: ! this.props.featured })}
              />
              {' '}
              Only featured images
            </label>
          </div>
        }

        <label>
          <input
            type="checkbox"
            checked={this.props.darken}
            onChange={event => this.props.onChange({ darken: ! this.props.darken })}
          />
          {' '}
          Slightly darken
        </label>
      </div>
    );
  }
}

export default UnsplashSettings;
