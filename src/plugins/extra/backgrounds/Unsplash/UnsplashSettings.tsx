import * as React from 'react';
import { Settings as SettingsInterface } from '../../../interfaces';
import { defaultProps } from './constants';
import { Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: SettingsInterface) => void;
}

class UnsplashSettings extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = defaultProps;

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            checked={this.props.curated === true}
            onChange={event => this.props.onChange({ curated: true })}
          />
          {' '}
          Official collection
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.curated === false}
            onChange={event => this.props.onChange({ curated: false })}
          />
          {' '}
          Custom search
        </label>

        {! this.props.curated &&
          <div>
            <label>
              Tag
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
          Slightly darken background
        </label>
      </div>
    );
  }
}

export default UnsplashSettings;
