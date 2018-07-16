import debounce from 'lodash-es/debounce';
import get from 'lodash-es/get';
import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending, RootState } from '../../../data';
import { getImage } from './api';
import { defaultProps } from './constants';
import { Image, Settings } from './interfaces';
import UnsplashCredit from './UnsplashCredit';
import './Unsplash.sass';

interface Props extends Settings {
  darken: boolean;
  blur: boolean;
  focus: boolean;
  local: Local;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  updateLocal: (state: Partial<Local>) => void;
}

interface Local {
  current?: Image & {
    timestamp: number;
  };
  next?: Image;
}

interface State {
  current?: Image & {
    src: string;
  };
}

class Unsplash extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = defaultProps;
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
      .catch(() => this.refresh(this.props));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.by !== this.props.by || nextProps.featured !== this.props.featured) {
      this.refreshDebounced.cancel();
      this.refresh(nextProps);
    }

    if (nextProps.search !== this.props.search || nextProps.collections !== this.props.collections) {
      this.refreshDebounced(nextProps);
    }
  }

  render() {
    const styles = this.state.current 
      ? { backgroundImage: `url(${this.state.current.src})` } 
      : { opacity: 0 };

    const classes = `Unsplash fullscreen${this.props.blur ? ' blur' : ''}`;
 
    return (
      <div className={classes} style={styles}>
        {this.props.darken && ! this.props.focus && <div className="darken fullscreen" />}
        {this.state.current && <UnsplashCredit image={this.state.current} />}
      </div>
    );
  }

  /**
   * Get image to display.
   *
   * @type {Promise<Image>}
   */
  private async getImage() {
    if (this.shouldRotate()) {
      return get(this.props, 'local.next.data') instanceof Blob
        ? get(this.props, 'local.next')
        : await this.fetchImage();
    } else {
      return get(this.props, 'local.current.data') instanceof Blob
        ? get(this.props, 'local.current')
        : await this.fetchImage();
    }
  }

  /**
   * Set the current image.
   *
   * @type {void}
   */
  private setCurrentImage = (image: Image & { timestamp?: number }) => {
    const src = URL.createObjectURL(image.data);
    const timestamp = image.timestamp || Date.now();

    this.setState({ current: {
      ...image as Image, src,
    }});
    this.props.updateLocal({ current: {
      ...image, timestamp,
    }});
  }

  /**
   * Set the next image.
   *
   * @type {void}
   */
  private setNextImage = (image: Image) => {
    this.props.updateLocal({ next: image });
  }

  /**
   * Should we rotate the currennt image.
   *
   * @type {boolean}
   */
  private shouldRotate(props: Props = this.props) {
    return get(props, 'local.current.timestamp', 0) + (this.props.timeout * 1000) < Date.now();
  }

  /**
   * Refresh current and next images.
   * (when settings update, for instance)
   *
   * @type {void}
   */
  private refresh(props: Props = this.props) {
    this.fetchImage(props).then(this.setCurrentImage);
    this.fetchImage(props).then(this.setNextImage);
  }

  /**
   * Fetch an image from the Unsplash API.
   *
   * @type {Promise<Image>}
   */
  private fetchImage(props: Props = this.props) {
    return getImage(
      props,
      this.props.pushPending,
      this.props.popPending,
    );
  }
}

const mapStateToProps = (state: RootState) => ({ focus: state.ui.focus });

const mapDispatchToProps = { popPending, pushPending };

export default connect(mapStateToProps, mapDispatchToProps)(Unsplash);
