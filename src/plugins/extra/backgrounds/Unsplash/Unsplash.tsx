import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending, RootState } from '../../../../data';
import { defaultProps, officialCollection, UNSPLASH_API_KEY, UNSPLASH_UTM } from './constants';
import { By, Image, Settings } from './interfaces';
import './Unsplash.sass';
const debounce = require('lodash/debounce');
const playIcon = require('feather-icons/dist/icons/play.svg');
const pauseIcon = require('feather-icons/dist/icons/pause.svg');

interface Props extends Settings {
  darken: boolean;
  focus: boolean;
  local: State;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  updateLocal: (state: Partial<State>) => void;
}

interface State {
  current?: Image & { src?: string };
  next?: Image;
  paused?: boolean;
}

class Unsplash extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = defaultProps;
  state: State = {};
  private refreshDebounced = debounce(this.refresh, 250);

  componentWillMount() {
    // Fetch or pull from cache current image
    if (this.props.local && this.props.local.next && this.props.local.next.data) {
      this.setImage(this.props.local.next);
    } else {
      this.fetchImage().then(image => this.setImage(image));
    }

    if (! this.props.local.paused) {
      // Fetch next image and replace in cache
      this.fetchImage().then(next => {
        // Check we haven't paused since firing this request
        if (! this.props.local.paused) {
          this.props.updateLocal({ next });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.by !== this.props.by || nextProps.featured !== this.props.featured) {
      this.refreshDebounced.cancel();
      this.refresh(nextProps);
    }

    if (nextProps.search !== this.props.search || nextProps.collections !== this.props.collections) {
      this.refreshDebounced(nextProps);
    }
  }

  render() {
    const styles = this.state.current
      ? { backgroundImage: `url(${this.state.current.src})` }
      : { opacity: 0 };

    return (
      <div className="Unsplash fullscreen" style={styles}>
        {this.props.darken && ! this.props.focus && <div className="darken fullscreen" />}

        {this.state.current && (
          <div className="credit">
            <span style={{float: 'right'}}>
              {this.state.current.location_title}
              &emsp;
              {this.props.local.paused
                ? <a onClick={this.play} title="Resume new images">
                    <i dangerouslySetInnerHTML={{ __html: playIcon }} />
                  </a>
                : <a onClick={this.pause} title="Pause on this image">
                    <i dangerouslySetInnerHTML={{ __html: pauseIcon }} />
                  </a>
              }
            </span>

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

  private pause = () => {
    this.props.updateLocal({
      paused: true,
      next: this.state.current,
    });
  }

  private play = () => {
    this.props.updateLocal({ paused: false });
    this.fetchImage().then(next => this.props.updateLocal({ next }));
  }

  private refresh(props: Props) {
    this.fetchImage(props).then(image => this.setImage(image));
    this.fetchImage(props).then(next => this.props.updateLocal({ next }));
  }

  private async fetchImage({ by, collections, featured, search }: Props = this.props): Promise<Image> {
    const headers = { Authorization: `Client-ID ${UNSPLASH_API_KEY}` };
    let url = 'https://api.unsplash.com/photos/random?';

    // Add search query
    switch (by) {
      case By.COLLECTIONS:
        url += `collections=${collections}`;
        break;

      case By.SEARCH:
        url += 'orientation=landscape'
          + (featured ? '&featured=true' : '')
          + (search ? `&query=${search}` : '');
        break;

      default:
        url += `collections=${officialCollection}`;
    }

    this.props.pushPending();
    const res = await (await fetch(url, { headers })).json();
    const data = await (await fetch(res.urls.raw + '?q=85&w=1920')).blob();
    this.props.popPending();

    return {
      data,
      image_link: res.links.html,
      location_title: res.location ? res.location.title : null,
      user_name: res.user.name,
      user_link: res.user.links.html,
    };
  }

  private setImage(image: Image) {
    const current = {
      ...image,
      src: URL.createObjectURL(image.data),
    };

    this.setState({ current });
  }
}

const mapStateToProps = (state: RootState) => {
  return { focus: state.ui.focus };
};

const mapDispatchToProps = { popPending, pushPending };

export default connect(mapStateToProps, mapDispatchToProps)(Unsplash);
