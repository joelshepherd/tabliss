import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending, RootState } from '../../../../data';
import { defaultProps, officialCollection, UNSPLASH_API_KEY, UNSPLASH_UTM } from './constants';
import { Image, Settings } from './interfaces';
import './Unsplash.sass';
const debounce = require('lodash/debounce');

interface Props extends Settings {
  darken: boolean;
  focus: boolean;
  local: State;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  setLocal: (state: Partial<State>) => void;
}

interface State {
  current?: Image & { src: string };
  next?: Image;
}

class Unsplash extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = defaultProps;
  state: State = {};
  private refreshDebounced = debounce(this.refresh, 500);

  componentWillMount() {
    // Fetch or pull from cache current image
    if (this.props.local && this.props.local.next && this.props.local.next.data) {
      this.setImage(this.props.local.next);
    } else {
      this.fetchImage().then(image => this.setImage(image));
    }

    // Fetch next image and replace in cache
    this.fetchImage().then(next => this.props.setLocal({ next }));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.featured !== this.props.featured || nextProps.curated !== this.props.curated) {
      this.refreshDebounced.cancel();
      this.refresh(nextProps);
    }

    if (nextProps.search !== this.props.search ) {
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

  private refresh(props: Props) {
    this.fetchImage(props).then(image => this.setImage(image));
    this.fetchImage(props).then(next => this.props.setLocal({ next }));
  }

  private async fetchImage({ curated, featured, search }: Props = this.props): Promise<Image> {
    const headers = { Authorization: `Client-ID ${UNSPLASH_API_KEY}` };
    const url = 'https://api.unsplash.com/photos/random?' + (curated
      ? `collections=${officialCollection}`
      : 'orientation=landscape' + (featured ? '&featured=true' : '') + (search ? `&query=${search}` : '')
    );

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
