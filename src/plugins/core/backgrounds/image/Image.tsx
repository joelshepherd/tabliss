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
    return <div className="Image fullscreen" style={{ backgroundImage: `url(${this.url})` }} />;
  }

  private get url() {
    if (this.current) {
      URL.revokeObjectURL(this.current);
    }

    if (! this.props.images.length) {
      return defaultImage;
    }

    return this.current = URL.createObjectURL(
      // @TODO Should this actually be truely random?
      // Rotating or peusdo-random might be better.
      sample(this.props.images)
    );
  }
}

export default Image;
