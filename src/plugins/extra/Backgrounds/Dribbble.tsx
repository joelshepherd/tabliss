import * as React from 'react';
import './Dribbble.css';

// @TODO Extract to a environment variable
const DRIBBBLE_API_KEY = 'DRIBBBLE_API_KEY';

interface Props {
  quality: string;
}

interface State {
  shots: any[]; // tslint:disable-line no-any
}

class Dribbble extends React.Component<Props, State> {
  static defaultProps: Props = {
    quality: 'normal',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      shots: [],
    };

    fetch(`https://api.dribbble.com/v1/shots?per_page=12`, {
      headers: {
        Authorization: `Bearer ${DRIBBBLE_API_KEY}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          shots: res,
        });
      })
      .catch(err => this.setState({ /* Default image? */ }));
  }

  render() {
    return (
      <div className="Background Dribbble">
        {this.state.shots.map((shot, key) =>
          <a href={shot.html_url} target="_blank" rel="noopener noreferrer">
            <div
              key={key}
              className="shot"
              style={{backgroundImage: `url(${shot.images[this.props.quality]})`}}
            />
          </a>
        )}
      </div>
    );
  }
}

export default Dribbble;
