import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  colour?: string;
  onChange: (settings: Settings) => void;
}

class ColourSettings extends React.Component<Props> /* implements Plugin - Not working because static */ {
  static defaultProps = {
    colour: '#185a9d',
  };

  render() {
    return (
      <div>
        <label>
          Colour
          <input
            type="color"
            value={this.props.colour}
            onChange={event => this.props.onChange({ colour: event.target.value })}
          />
        </label>
      </div>
    );
  }
}

export default ColourSettings;
