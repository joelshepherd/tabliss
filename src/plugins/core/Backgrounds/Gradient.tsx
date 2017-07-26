import * as React from 'react';
import GradientSettings from './GradientSettings';

interface Props {
  angle: number;
  from: string;
  to: string;
  type: string;
}

class Gradient extends React.Component<Props>{
  static defaultProps = GradientSettings.defaultProps;

  render() {
    const backgroundImage = `${this.props.type}(${this.props.angle}deg, ${this.props.from}, ${this.props.to})`;
    return <div className="Background Gradient" style={{ backgroundImage }} />;
  }
}

export default Gradient;
