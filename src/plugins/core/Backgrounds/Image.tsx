import * as React from 'react';
const image = require('./image-default.jpg');

interface Props {
  image: string;
}

class Image extends React.Component<Props> {
  static defaultProps = { image };

  render() {
    const styles = {
      backgroundImage: `url(${this.props.image})`,
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
    };

    return <div className="Background Image" style={styles} />;
  }
}

export default Image;
