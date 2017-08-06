import * as React from 'react';
import { Settings } from '../../../interfaces';

interface Props {
  tag?: string;
  nsfw?: boolean;
  onChange: (settings: Settings) => void;
}

class GiphySettings extends React.PureComponent<Props> {
  static defaultProps = {
    tag: 'cats',
    nsfw: false,
  };

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
          Allow NSFW
        </label>
      </div>
    );
  }
}

export default GiphySettings;
