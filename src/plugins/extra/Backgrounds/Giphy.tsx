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
}

class Giphy extends React.Component<Props, State> {
  static defaultProps = {
    tag: 'cats',
    nsfw: false,
  };

  state: State = {};

  componentWillMount() {
    // Fetch or pull from cache for current gif
    if (this.props.state && this.props.state.next && this.props.state.next.data) {
      this.set(this.props.state.next);
      this.props.pushState({ next: undefined });
    } else {
      this.fetch().then(gif => this.set(gif));
    }

    // Fetch next gif and inject into cache
    this.fetch().then(next => this.props.pushState({ next }));
  }

  componentWillReceiveProps(props: Props) {
    if (props.nsfw !== this.props.nsfw || props.tag !== this.props.tag) {
      this.fetch().then(gif => this.set(gif));

      // Flush and fetch new cached gif
      this.props.pushState({ next: undefined });
      this.fetch().then(next => this.props.pushState({ next }));
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
          <img src={giphyLogo} />
        </div>
      </div>
    );
  }

  private async fetch() {
    const request = new Request(
      'https://api.giphy.com/v1/gifs/random'
        + `?api_key=${GIPHY_API_KEY}`
        + '&rating=' + (this.props.nsfw ? 'r' : 'g')
        + (this.props.tag ? `&tag=${this.props.tag}` : '')
    );

    const res = await (await fetch(request)).json();
    const data = await (await fetch(res.data.image_mp4_url)).blob();

    return { data };
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
