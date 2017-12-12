import * as React from 'react';

interface Props {
  angle?: number;
  from?: string;
  to?: string;
  type?: string;
}

class Gradient extends React.PureComponent<Props> {
  static defaultProps: Props = {
    angle: 0,
    from : '#3498db',
    to: '#9b59b6',
    type: 'linear-gradient',
  };

  render() {
    const backgroundImage = `${this.props.type}(${this.props.angle}deg, ${this.props.from}, ${this.props.to})`;

    return <div className="Gradient fullscreen" style={{ backgroundImage }} />;
  }
}

export default Gradient;
