import * as React from 'react';
import { Settings } from '../../interfaces';
import Font from './Font';

interface Props {
  colour: string;
  family: string;
  size: number;
  onChange: (settings: Settings) => void;
}

class FontSettings extends React.Component<Props> {
  static defaultProps = Font.defaultProps;

  render() {
    return (
      <div>
        <label>
          Family
          <input
            type="text"
            value={this.props.family}
            onChange={event => this.props.onChange({ family: event.target.value })}
          />
        </label>

        <label>
          Size
          <input
            type="number"
            value={this.props.size}
            onChange={event => this.props.onChange({ size: event.target.value })}
          />
        </label>

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

export default FontSettings;
