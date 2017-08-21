import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../../data';
import './Dribbble.css';

// @TODO Extract to a environment variable
const DRIBBBLE_API_KEY = 'DRIBBBLE_API_KEY';

interface Props {
  focus: boolean;
  quality: string; // TypeScript doesn't understand this -> undefined -> defaultProps
}

interface State {
  shots: Shot[];
}

interface Shot {
  id: number;
  title: string;
  html_url: string;
  images: {
    normal: string;
    hidpi?: string;
  };
  user: {
    name: string;
  };
}

class Dribbble extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    focus: false,
    quality: 'normal',
  };

  state: State = {
    shots: [],
  };

  componentWillMount() {
    const request = new Request(
      'https://api.dribbble.com/v1/shots?per_page=12',
      {headers: {Authorization: `Bearer ${DRIBBBLE_API_KEY}`}},
    );

    fetch(request)
      .then(res => res.json())
      .then(res => this.setState({ shots: res }));
  }

  render() {
    return (
      <div className="Dribbble">
        <div className="shots fullscreen">
          {this.state.shots.map(shot => this.renderShot(shot))}
        </div>

        {! this.props.focus && <div className="darken fullscreen" />}
      </div>
    );
  }

  private renderShot(shot: Shot) {
    const backgroundImage = `url(${shot.images[this.props.quality] || shot.images.normal})`;

    return (
      <a
        key={shot.id}
        href={shot.html_url}
        title={shot.title + ' by ' + shot.user.name}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="shot" style={{ backgroundImage }} />
      </a>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { focus: state.ui.focus };
};

export default connect(mapStateToProps)(Dribbble);
