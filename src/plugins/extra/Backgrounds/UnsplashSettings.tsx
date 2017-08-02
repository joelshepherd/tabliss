import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  darken: boolean;
  onChange: (settings: Settings) => void;
}

class UnsplashSettings extends React.Component<Props> {
  static defaultProps = {
    darken: true,
  };

  render() {
    return (
      <div>
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
