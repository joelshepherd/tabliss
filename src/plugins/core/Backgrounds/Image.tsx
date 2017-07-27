import * as React from 'react';
import ImageSettings from './ImageSettings';

interface Props {
  image: string;
}

class Image extends React.Component<Props> {
  static defaultProps = ImageSettings.defaultProps;

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
