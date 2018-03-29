import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  quality?: string;
  onChange: (settings: Settings) => void;
}

class DribbbleSettings extends React.PureComponent<Props> {
  static defaultProps = {
    quality: 'normal',
  };

  render() {
    return (
      <div className="DribbbleSettings">
        <label>
          <input
            type="radio"
            checked={this.props.quality === 'normal'}
            onChange={event => this.props.onChange({ quality: 'normal' })}
          />
          {' '}
          Normal quality
        </label>

        <label>
          <input
            type="radio"
            checked={this.props.quality === 'hidpi'}
            onChange={event => this.props.onChange({ quality: 'hidpi' })}
          />
          {' '}
          I hate my CPU quality
        </label>
      </div>
    );
  }
}

export default DribbbleSettings;
