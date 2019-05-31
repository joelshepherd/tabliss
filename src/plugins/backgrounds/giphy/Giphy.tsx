import debounce from 'lodash-es/debounce';
import get from 'lodash-es/get';
import React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending, RootState } from '../../../data';
import './Giphy.sass';
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const giphyLogo = require('./giphy-logo.png');

interface Props {
  expand?: boolean;
  focus: boolean;
  local: State;
  nsfw?: boolean;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  tag?: string;
  setLocal: (state: State) => void;
}

interface State {
  current?: Gif & { src: string };
  next?: Gif;
}

interface Gif {
  data: Blob;
  link: string;
}

class Giphy extends React.PureComponent<Props, State> {
  static defaultProps = {
    expand: false,
    focus: false,
    nsfw: false,
    tag: 'pattern',
  };

  state: State = {};

  private debouncedRefresh = debounce(this.refresh, 500);

  componentWillMount() {
    // Fetch or pull from cache for current gif
    if (get(this.props, 'local.next.data') instanceof Blob) {
      this.set(get(this.props, 'local.next'));
    } else {
      this.fetch(this.props.tag, this.props.nsfw).then(gif => this.set(gif));
    }

    // Fetch next gif and inject into cache
    this.fetch(this.props.tag, this.props.nsfw).then(next =>
      this.props.setLocal({ next }),
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.nsfw !== this.props.nsfw) {
      this.refresh(nextProps.tag, nextProps.nsfw);
    }

    if (nextProps.tag !== this.props.tag) {
      this.debouncedRefresh(nextProps.tag, nextProps.nsfw);
    }
  }

  render() {
    const styles = {
      backgroundImage: this.state.current
        ? `url(${this.state.current.src})`
        : undefined,
      backgroundSize: this.props.expand ? 'cover' : undefined,
      opacity: this.state.current ? 1 : 0,
    };

    return (
      <div className="Giphy fullscreen">
        <div className="gif fullscreen" style={styles} />

        {!this.props.focus && <div className="darken fullscreen" />}

        <div className="credit">
          <a
            href={
              this.state.current && this.state.current.link
                ? this.state.current.link
                : 'https://giphy.com/'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={giphyLogo} />
          </a>
        </div>
      </div>
    );
  }

  private refresh(tag?: string, nsfw?: boolean) {
    // Fetch current gif
    this.fetch(tag, nsfw).then(gif => this.set(gif));

    // Clear and fetch next
    this.props.setLocal({ next: undefined });
    this.fetch(tag, nsfw).then(next => this.props.setLocal({ next }));
  }

  private async fetch(tag?: string, nsfw?: boolean) {
    const request = new Request(
      'https://api.giphy.com/v1/gifs/random' +
        `?api_key=${GIPHY_API_KEY}` +
        '&rating=' +
        (nsfw ? 'r' : 'g') +
        (tag ? `&tag=${tag}` : ''),
    );

    this.props.pushPending();
    const res = await (await fetch(request)).json();
    const data = await (await fetch(res.data.image_original_url)).blob();
    this.props.popPending();

    return {
      data,
      link: res.data.url,
    };
  }

  private set(gif: Gif) {
    this.setState({
      current: {
        ...gif,
        src: URL.createObjectURL(gif.data),
      },
    });
  }
}

const mapStateToProps = (state: RootState) => ({ focus: state.ui.focus });
const mapDispatchToProps = { popPending, pushPending };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Giphy);
