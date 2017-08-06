import * as React from 'react';
import './Image.css';
const image = require('./image-default.jpg');

interface Props {
  image?: string;
}

class Image extends React.PureComponent<Props> {
  static defaultProps = {
    image
  };

  render() {
    const backgroundImage = `url(${this.props.image})`;

    return <div className="Background Image" style={{ backgroundImage }} />;
  }
}

export default Image;
