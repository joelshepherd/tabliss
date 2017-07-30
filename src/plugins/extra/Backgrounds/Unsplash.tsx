import * as React from 'react';
import './Unsplash.css';

// @TODO Extract to a environment variable
const UNSPLASH_API_KEY = 'UNSPLASH_API_KEY';
const UNSPLASH_UTM = '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

interface State {
  image?: string;
  user?: {
    name: string;
    link: string;
  };
}

class Unsplash extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {};

    fetch(`https://api.unsplash.com/photos/random?featured=true&orientation=landscape`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.load(res.urls.raw + '?q=90&w=2560&fit=max&fm=jpg');
        this.setState({
          user: {
            name: res.user.name,
            link: res.user.links.html,
          }
        });
      })
      .catch(err => this.setState({ /* Default image? */ }));
  }

  render() {
    const styles: React.CSSProperties = {
      backgroundImage: this.state.image ? `url(${this.state.image})` : undefined,
      opacity: this.state.image ? 1 : 0,
    };

    return (
      <div className="Background Unsplash" style={styles}>
        {this.state.user && (
          <div className="credit">
            {'Photo by '}
            <a href={this.state.user.link + UNSPLASH_UTM} target="_blank" rel="noopener noreferrer">
              {this.state.user.name}
            </a>
            {' / '}
            <a href={'https://unsplash.com/' + UNSPLASH_UTM} target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </div>
        )}
      </div>
    );
  }

  private load(source: string) {
    fetch(source)
      .then(res => res.blob())
      .then(res => this.setState({
        image: window.URL.createObjectURL(res),
      }));
  }
}

export default Unsplash;
