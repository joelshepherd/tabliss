import * as React from 'react';
import { ActionCreator } from 'redux';
import { connect } from 'react-redux';
import * as parseLinkHeader from 'parse-link-header';
import { Action, popPending, pushPending, RootState } from '../../../data';
import { Shot } from './interfaces';
import './Dribbble.sass';
const DRIBBBLE_API_KEY = process.env.DRIBBBLE_API_KEY;

interface Props {
  focus: boolean;
  quality: string;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
}

interface State {
  shots: Shot[];
  nextLink?: string;
}

class Dribbble extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    quality: 'normal',
  };

  shotsRef: HTMLDivElement | null;

  state: State = {
    shots: [],
    // nextLink: 'https://api.dribbble.com/v1/shots?per_page=12',
  };

  componentWillMount() {
    const promise = this.load();

    if (promise && this.props.focus) {
      promise.then(() => this.load());
    }
  }

  componentWillReceiveProps(props: Props) {
    if (props.focus) {
      this.onScroll();
    }
  }

  render() {
    return (
      <div className="Dribbble">
        <div style={{ padding: '1em', textAlign: 'center' }}>
          <h3>Sorry, the Dribbble shots API has been deprecated and this background no longer works.</h3>
          <p>
            I have written to Dribbble requesting access for Tabliss to their new API endpoint.
            If they accept my request, this background will resume working again.
            If not, the Dribbble background plugin will be removed shortly :(
          </p>
        </div>

        <div
          className="shots fullscreen"
          onScroll={() => this.onScroll()}
          ref={ref => this.shotsRef = ref}
        >
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
        title={`${shot.title} by ${shot.user.name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="shot" style={{ backgroundImage }} />
      </a>
    );
  }

  private load() {
    if (! this.state.nextLink) {
      return;
    }

    const request = new Request(
      this.state.nextLink,
      { headers: { Authorization: `Bearer ${DRIBBBLE_API_KEY}` } },
    );

    this.setState({ nextLink: undefined });
    this.props.pushPending();

    return fetch(request)
      .then(res => {
        // Find next link
        const links = parseLinkHeader(res.headers.get('Link') || '');
        const nextLink = (links && links.next) ? links.next.url : undefined;
        this.setState({ nextLink });

        return res.json();
      })
      .then(shots => {
        this.setState({
          shots: [...this.state.shots, ...shots],
        });
        this.props.popPending();
      });
  }

  private onScroll() {
    if (! this.shotsRef) {
      return;
    }

    if (this.shotsRef.scrollHeight - this.shotsRef.scrollTop === this.shotsRef.clientHeight) {
      this.load();
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return { focus: state.ui.focus };
};

const mapDispatchToProps = { popPending, pushPending };

export default connect(mapStateToProps, mapDispatchToProps)(Dribbble);
