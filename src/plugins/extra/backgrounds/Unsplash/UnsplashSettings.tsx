import * as React from 'react';
import { Settings as SettingsInterface } from '../../../interfaces';
import { Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: SettingsInterface) => void;
}

class UnsplashSettings extends React.PureComponent<Props> {
  static defaultProps = {
    curated: true,
    darken: true,
    featured: true,
  };

  render() {
    return (
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
          Featured only
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.curated}
            onChange={event => this.props.onChange({ curated: ! this.props.curated })}
          />
          {' '}
          Unsplash Editorial collection only
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.darken}
            onChange={event => this.props.onChange({ darken: ! this.props.darken })}
          />
          {' '}
          Darken slightly
        </label>
      </div>
    );
  }
}

export default UnsplashSettings;
