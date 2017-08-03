import * as React from 'react';
import { connect } from 'react-redux';
import { State as RootState } from '../../../data';
import './Unsplash.css';

// @TODO Extract to a environment variable
const UNSPLASH_API_KEY = 'UNSPLASH_API_KEY';
const UNSPLASH_UTM = '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

interface Props {
  darken: boolean;
  focus: boolean;
  state: State;
  pushState: (state: State) => void;
}

interface Image {
  data: Blob;
  user_name: string;
  user_link: string;
}

interface State {
  current?: Image & { src: string };
  next?: Image;
}

class Unsplash extends React.Component<Props, State> {
  static defaultProps = {
    darken: true,
    focus: false,
  };

  state: State = {};

  componentWillMount() {
    // Fetch or pull from cache current image
    if (this.props.state && this.props.state.next && this.props.state.next.data) {
      this.setImage(this.props.state.next);
      this.props.pushState({ next: undefined });
    } else {
      this.fetch().then(image => this.setImage(image));
    }

    // Fetch next image and inject into cache
    this.fetch().then(image => this.props.pushState({ next: image }));
  }

  render() {
    const styles = this.state.current
      ? { backgroundImage: `url(${this.state.current.src})` }
      : { opacity: 0 };

    return (
      <div className="Background Unsplash" style={styles}>
        {this.props.darken && ! this.props.focus &&
          <div className="Background darken" />
        }

        {this.state.current && (
          <div className="credit">
            {'Photo by '}
            <a href={this.state.current.user_link + UNSPLASH_UTM} target="_blank" rel="noopener noreferrer">
              {this.state.current.user_name}
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

  private async fetch() {
    const request = new Request(
      'https://api.unsplash.com/photos/random?featured=true&orientation=landscape',
      { headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` } },
    );

    const res = await (await fetch(request)).json();
    const data = await (await fetch(res.urls.raw + '?w=1920')).blob();

    return {
      data,
      user_name: res.user.name,
      user_link: res.user.links.html,
    };
  }

  private setImage(image: Image) {
    this.setState({
      current: {
        ...image,
        src: URL.createObjectURL(image.data),
      },
    });
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    focus: state.dashboard.focus,
  };
};

export default connect(mapStateToProps, {})(Unsplash);
