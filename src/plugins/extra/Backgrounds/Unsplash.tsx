import * as React from 'react';
import { connect } from 'react-redux';
import { State as RootState } from '../../../data';
import './Unsplash.css';

// @TODO Extract to a environment variable
const UNSPLASH_API_KEY = 'UNSPLASH_API_KEY';
const UNSPLASH_UTM = '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

interface Props {
  darken?: boolean;
  focus: boolean;
}

interface State {
  image?: string;
  user?: {
    name: string;
    link: string;
  };
}

class Unsplash extends React.Component<Props, State> {
  static defaultProps = {
    darken: true,
    focus: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {};

    fetch(`https://api.unsplash.com/photos/random?featured=true&orientation=landscape`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.load(res.urls.raw + '?q=90&w=1920&fit=max&fm=jpg');
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
        {this.props.darken && ! this.props.focus &&
          <div className="Background darken" />
        }

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

const mapStateToProps = (state: RootState) => {
  return {
    focus: state.dashboard.focus,
  };
};

export default connect(mapStateToProps, {})(Unsplash);
