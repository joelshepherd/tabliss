import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  colour?: string;
  family?: string;
  size?: number;
  weight?: number;
  onChange: (settings: Settings) => void;
}

class FontSettings extends React.PureComponent<Props> {
  static defaultProps = {
    colour: '#ffffff',
    family: '',
    size: 28,
    weight: 400,
  };

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
          Weight override
          <select value={this.props.weight} onChange={event => this.props.onChange({ weight: event.target.value})}>
            <option value={undefined}>None</option>
            <option value={100}>Thin</option>
            <option value={300}>Light</option>
            <option value={400}>Regular</option>
            <option value={500}>Medium</option>
            <option value={700}>Bold</option>
            <option value={900}>Black</option>
          </select>
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
