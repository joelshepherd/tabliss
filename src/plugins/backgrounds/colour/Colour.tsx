import * as React from 'react';

interface Props {
  colour?: string;
}

class Colour extends React.PureComponent<Props> {
  static defaultProps: Props = {
    colour: '#3498db',
  };

  render() {
    return (
      <div
        className="Colour fullscreen"
        style={{ backgroundColor: this.props.colour }}
      />
    );
  }
}

export default Colour;
