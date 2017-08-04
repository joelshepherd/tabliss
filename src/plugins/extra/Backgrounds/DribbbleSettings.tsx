import * as React from 'react';
import { Settings } from '../../interfaces';
import Dribbble from './Dribbble';

interface Props {
  quality: string;
  onChange: (settings: Settings) => void;
}

class DribbbleSettings extends React.Component<Props> {
  static defaultProps = Dribbble.defaultProps;

  render() {
    return (
      <div>
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
