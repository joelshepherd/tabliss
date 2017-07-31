import * as React from 'react';
import './Giphy.css';
const giphyDefault = require('./giphy-default.mp4');

// @TODO Extract to a environment variable
const GIPHY_API_KEY = 'GIPHY_API_KEY';

interface Props {
  tag?: string;
  nsfw?: boolean;
}

interface State {
  video?: string;
}

class Giphy extends React.Component<Props, State> {
  static defaultProps = {
    tag: 'cats',
    nsfw: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      video: undefined,
    };

    this.fetchGif();
  }

  componentWillReceiveProps() {
    this.fetchGif();
  }

  render() {
    return (
      <div className="Background Giphy">
        <video
          src={this.state.video}
          style={{ opacity: this.state.video ? 1 : 0 }}
          autoPlay={true}
          loop={true}
        />
      </div>
    );
  }

  private fetchGif() {
    const params = `api_key=${GIPHY_API_KEY}`
      + (this.props.tag ? `&tag=${this.props.tag}` : '')
      + '&rating=' + (this.props.nsfw ? 'r' : 'g');

    return fetch(`https://api.giphy.com/v1/gifs/random?${params}`)
      .then(res => res.json())
      .then(res => this.setState({ video: res.data.image_mp4_url }))
      .catch(err => this.setState({ video: giphyDefault }));
  }
}

export default Giphy;
