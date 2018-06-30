import sample from 'lodash-es/sample';
import * as React from 'react';
import './Image.sass';

interface Props {
  images: File[];
}

class Image extends React.PureComponent<Props> {
  static defaultProps = {
    images: [],
  };
  private current: string;

  render() {
    if (! this.props.images.length) {
      return <div className="Image fullscreen" style={{ backgroundColor: '#212121' }} />;
    }

    return <div className="Image fullscreen" style={{ backgroundImage: `url(${this.url})` }} />;
  }

  private get url() {
    if (this.current) {
      URL.revokeObjectURL(this.current);
    }

    return this.current = URL.createObjectURL(
      // @TODO Should this actually be truely random?
      // Rotating or peusdo-random might be better.
      sample(this.props.images)
    );
  }
}

export default Image;
