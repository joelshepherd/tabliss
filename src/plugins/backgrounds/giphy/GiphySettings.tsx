import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  expand?: boolean;
  nsfw?: boolean;
  tag?: string;
  onChange: (settings: Settings) => void;
}

class GiphySettings extends React.PureComponent<Props> {
  static defaultProps = {
    expand: false,
    tag: 'pattern',
    nsfw: false,
  };

  render() {
    return (
      <div className="GiphySettings">
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

        <label>
          <input
            type="checkbox"
            checked={this.props.expand}
            onChange={event => this.props.onChange({ expand: ! this.props.expand })}
          />
          {' '}
          Stretch to fill screen
        </label>
      </div>
    );
  }
}

export default GiphySettings;
