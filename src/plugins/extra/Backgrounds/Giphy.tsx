import { debounce } from 'lodash';
import * as React from 'react';
import './Giphy.css';
const giphyLogo = require('./giphy-logo.png');

// @TODO Extract to a environment variable
const GIPHY_API_KEY = 'GIPHY_API_KEY';

interface Props {
  tag?: string;
  nsfw?: boolean;
  state: State;
  pushState: (state: State) => void;
}

interface State {
  current?: Gif & { src: string };
  next?: Gif;
}

interface Gif {
  data: Blob;
  link: string;
}

class Giphy extends React.Component<Props, State> {
  static defaultProps = {
    tag: 'cats',
    nsfw: false,
  };

  state: State = {};

  private debouncedRefresh = debounce(this.refresh, 500);

  componentWillMount() {
    // Fetch or pull from cache for current gif
    if (this.props.state && this.props.state.next && this.props.state.next.data) {
      this.set(this.props.state.next);
      this.props.pushState({ next: undefined });
    } else {
      this.fetch(this.props.tag, this.props.nsfw)
        .then(gif => this.set(gif));
    }

    // Fetch next gif and inject into cache
    this.fetch(this.props.tag, this.props.nsfw)
      .then(next => this.props.pushState({ next }));
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
    return (
      <div className="Background Giphy">
        <div style={{ opacity: this.state.current ? 1 : 0 }}>
          {this.state.current && this.state.current.src &&
            <video
              src={this.state.current.src}
              autoPlay={true}
              loop={true}
            />
          }
        </div>

        <div className="credit">
          <a
            href={this.state.current && this.state.current.link ? this.state.current.link : 'htts://giphy.com/'}
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
    this.props.pushState({ next: undefined });
    this.fetch(tag, nsfw).then(next => this.props.pushState({ next }));
  }

  private async fetch(tag?: string, nsfw?: boolean) {
    const request = new Request(
      'https://api.giphy.com/v1/gifs/random'
        + `?api_key=${GIPHY_API_KEY}`
        + '&rating=' + (nsfw ? 'r' : 'g')
        + (tag ? `&tag=${tag}` : '')
    );

    const res = await (await fetch(request)).json();
    const data = await (await fetch(res.data.image_mp4_url)).blob();

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
      }
    });
  }
}

export default Giphy;
