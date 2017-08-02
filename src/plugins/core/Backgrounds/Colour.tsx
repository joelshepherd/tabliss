import * as React from 'react';

interface Props {
  colour?: string;
}

class Colour extends React.Component<Props> {
  static defaultProps = {
    colour: '#185a9d',
  };

  render() {
    return <div className="Background Colour" style={{backgroundColor: this.props.colour}} />;
  }
}

export default Colour;
