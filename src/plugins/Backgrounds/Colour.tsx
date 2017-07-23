import * as React from 'react';
import ColourSettings from './ColourSettings';

interface Props {
  colour?: string;
}

class Colour extends React.Component<Props> {
  static title = 'Colour Background';
  static type = 'background';
  static settings = ColourSettings;
  static defaultProps = ColourSettings.defaultProps;

  render() {
    return <div className="Background Colour" style={{backgroundColor: this.props.colour}} />;
  }
}

export default Colour;
