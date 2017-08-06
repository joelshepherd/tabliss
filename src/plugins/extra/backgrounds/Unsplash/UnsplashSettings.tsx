import * as React from 'react';
import { Settings } from '../../../interfaces';

interface Props {
  darken: boolean;
  featured?: boolean;
  search?: string;
  onChange: (settings: Settings) => void;
}

class UnsplashSettings extends React.PureComponent<Props> {
  static defaultProps = {
    darken: true,
    featured: true,
  };

  render() {
    return (
      <div>
        <label>
          Search
          <input
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
          Only featured
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
