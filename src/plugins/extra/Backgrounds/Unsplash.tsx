import { debounce } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { State as RootState } from '../../../data';
import './Unsplash.css';

// @TODO Extract to a environment variable
const UNSPLASH_API_KEY = 'UNSPLASH_API_KEY';
const UNSPLASH_UTM = '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

interface Props {
  darken: boolean;
  featured: boolean;
  focus: boolean;
  search?: string;
  state: State;
  pushState: (state: State) => void;
}

interface Image {
  data: Blob;
  image_link: string;
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
    featured: true,
    focus: false,
  };

  state: State = {};

  private debouncedRefresh = debounce(this.refresh, 500);

  componentWillMount() {
    // Fetch or pull from cache current image
    if (this.props.state && this.props.state.next && this.props.state.next.data) {
      this.set(this.props.state.next);
      this.props.pushState({ next: undefined });
    } else {
      this.fetch(this.props.search, this.props.featured)
        .then(image => this.set(image));
    }

    // Fetch next image and inject into cache
    this.fetch(this.props.search, this.props.featured)
      .then(next => this.props.pushState({ next }));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.featured !== this.props.featured) {
      this.refresh(nextProps.search, nextProps.featured);
    }

    if (nextProps.search !== this.props.search ) {
      this.debouncedRefresh(nextProps.search, nextProps.featured);
    }
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
            <a href={this.state.current.image_link + UNSPLASH_UTM} target="_blank" rel="noopener noreferrer">
              Photo
            </a>
            {' by '}
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

  private refresh(search?: string, featured?: boolean) {
    // Fetch current image
    this.fetch(search, featured).then(image => this.set(image));

    // Clear and fetch next
    this.props.pushState({ next: undefined });
    this.fetch(search, featured).then(next => this.props.pushState({ next }));
  }

  private async fetch(search?: string, featured?: boolean) {
    const request = new Request(
      (
        'https://api.unsplash.com/photos/random?orientation=landscape'
        + (featured ? '&featured=true' : '')
        + (search ? `&query=${search}` : '')
      ),
      { headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` } },
    );

    const res = await (await fetch(request)).json();
    const data = await (await fetch(res.urls.raw + '?q=90w=1920')).blob();

    return {
      data,
      image_link: res.links.html,
      user_name: res.user.name,
      user_link: res.user.links.html,
    };
  }

  private set(image: Image) {
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
