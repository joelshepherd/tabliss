import sample from 'lodash-es/sample';
import * as Raven from 'raven-js';
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
      return <div className="Image default fullscreen" />;
    }

    return <div className="Image fullscreen" style={{ backgroundImage: `url(${this.url})` }} />;
  }

  private get url() {
    if (this.current) {
      URL.revokeObjectURL(this.current);
    }

    // @TODO Should this actually be truely random?
    // Rotating or peusdo-random might be better.
    const image = sample(this.props.images);

    try {
      return this.current = URL.createObjectURL(image);
    } catch (err) {
      // Y u no give less vague messages so I can fix you!
      // ლ(ಠ益ಠლ)
      Raven.setExtraContext({
        size: image && image.size,
        type: image && image.type,
        typeof: typeof image,
      });

      throw new Error('Unable to display image.');
    }
  }
}

export default Image;
