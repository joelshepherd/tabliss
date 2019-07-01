import debounce from 'lodash-es/debounce';
import get from 'lodash-es/get';
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../../store/store';
import { getImage } from './api';
import { defaultProps } from './constants';
import { Image, Props } from './interfaces';
import UnsplashCredit from './UnsplashCredit';
import './Unsplash.sass';

interface State {
  current?: Image & {
    src: string;
  };
}

class Unsplash extends React.PureComponent<Props & { focus: boolean }, State> {
  static defaultProps = { data: defaultProps };
  state: State = {};
  private refreshDebounced = debounce(this.refresh, 250);

  componentWillMount() {
    const shouldRotate = this.shouldRotate();

    this.getImage()
      .then(this.setCurrentImage)
      .then(() => {
        if (shouldRotate) {
          this.fetchImage().then(this.setNextImage);
        }
      })
      .catch(() => this.refresh(this.props.data));
  }

  componentWillReceiveProps({ data }: Props) {
    if (
      data.by !== this.props.data.by ||
      data.featured !== this.props.data.featured
    ) {
      this.refreshDebounced.cancel();
      this.refresh(data);
    }

    if (
      data.search !== this.props.data.search ||
      data.collections !== this.props.data.collections
    ) {
      this.refreshDebounced(data);
    }
  }

  render() {
    const { focus } = this.props;
    const { blur, darken } = this.props.data;

    let styles: React.CSSProperties = this.state.current
      ? { backgroundImage: `url(${this.state.current.src})` }
      : { opacity: 0 };

    if (blur && !focus) {
      styles = {
        ...styles,
        filter: `blur(${blur}px)`,
        transform: `scale(${blur / 500 + 1})`,
      };
    }

    return (
      <div className="Unsplash fullscreen">
        <div className="image fullscreen" style={styles} />
        {darken && !focus ? (
          <div
            className="fullscreen"
            style={{ backgroundColor: `rgba(0, 0, 0, ${darken * 0.01})` }}
          />
        ) : (
          ''
        )}
        {this.state.current && <UnsplashCredit image={this.state.current} />}
      </div>
    );
  }

  /**
   * Get image to display.
   */
  private async getImage() {
    if (this.shouldRotate()) {
      return get(this.props.cache, 'next.data') instanceof Blob
        ? this.props.cache.next!
        : await this.fetchImage();
    } else {
      return get(this.props.cache, 'current.data') instanceof Blob
        ? this.props.cache.current!
        : await this.fetchImage();
    }
  }

  /**
   * Set the current image.
   */
  private setCurrentImage = (image: Image & { timestamp?: number }) => {
    const src = URL.createObjectURL(image.data);
    const timestamp = image.timestamp || Date.now();

    this.setState({
      current: {
        ...image,
        src,
      },
    });
    this.props.setCache({
      ...this.props.cache,
      current: {
        ...image,
        timestamp,
      },
    });

    let img = new Image();
    img.onerror = () => {
      this.refresh(this.props.data);
    };
    img.src = src;
  };

  /**
   * Set the next image.
   */
  private setNextImage = (image: Image) => {
    this.props.setCache({
      ...this.props.cache,
      next: image,
    });
  };

  /**
   * Should we rotate the currennt image.
   */
  private shouldRotate(props: Props = this.props) {
    return (
      get(props.cache, 'current.timestamp', 0) +
        (this.props.data.timeout || 0) * 1000 <
      Date.now()
    );
  }

  /**
   * Refresh current and next images.
   * (when settings update, for instance)
   */
  private refresh(props: Props['data'] = this.props.data) {
    this.fetchImage(props).then(this.setCurrentImage);
    this.fetchImage(props).then(this.setNextImage);
  }

  /**
   * Fetch an image from the Unsplash API.
   */
  private fetchImage(props: Props['data'] = this.props.data) {
    return getImage(props, () => {}, () => {});
  }
}

const mapStateToProps = (state: RootState) => ({ focus: state.ui.focus });

export default connect(mapStateToProps)(Unsplash);
