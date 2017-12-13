import * as React from 'react';
import sample from 'lodash-es/sample';
import './Image.sass';
const defaultImage = require('./image.jpg');

interface Props {
  images: File[];
}

class Image extends React.PureComponent<Props> {
  static defaultProps = {
    images: [],
  };
  private current: string;

  render() {
    const styles = { backgroundImage: `url(${this.url})` };

    // @TODO Have this as an actual image with an `onLoad` callback to fade out?
    return <div className="Image fullscreen" style={styles} />;
  }

  private get url() {
    if (this.current) {
      URL.revokeObjectURL(this.current);
    }

    if (! this.props.images.length) {
      return defaultImage;
    }

    return this.current = URL.createObjectURL(
      // @TODO Should this actually be truely random? Rotating or peusdo-random might be better.
      sample(this.props.images)
    );
  }
}

export default Image;
