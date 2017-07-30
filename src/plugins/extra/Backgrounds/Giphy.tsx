import * as React from 'react';
const giphyDefault = require('./giphy-default.mp4');

// @TODO Extract to a environment variable
const GIPHY_API_KEY = 'GIPHY_API_KEY';

interface State {
  video?: string;
}

class Giphy extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      video: undefined,
    };

    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=1`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          video: res.data[0].images.original.mp4,
        });
      })
      .catch(err => this.setState({ video: giphyDefault }));
  }

  render() {
    const containerStyles: React.CSSProperties = {
      backgroundColor: 'black',
      overflow: 'hidden',
    };

    const videoStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minHeight: '100%',
      minWidth: '100%',
      opacity: this.state.video ? 1 : 0,
      transition: 'opacity 0.25s ease-out',
    };

    return (
      <div className="Background Giphy" style={containerStyles}>
        <video src={this.state.video} style={videoStyles} autoPlay={true} loop={true} />
      </div>
    );
  }
}

export default Giphy;
