import * as React from 'react';
import { Settings } from '../../interfaces';
import Giphy from './Giphy';

interface Props {
  tag?: string;
  nsfw?: boolean;
  onChange: (settings: Settings) => void;
}

class GiphySettings extends React.Component<Props> {
  static defaultProps = Giphy.defaultProps;

  render() {
    return (
      <div>
        <label>
          Tag
          <input
            type="text"
            value={this.props.tag}
            onChange={event => this.props.onChange({ tag: event.target.value })}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={this.props.nsfw}
            onChange={event => this.props.onChange({ nsfw: ! this.props.nsfw })}
          />
          {' '}
          Permit NSFW
        </label>
      </div>
    );
  }
}

export default GiphySettings;
