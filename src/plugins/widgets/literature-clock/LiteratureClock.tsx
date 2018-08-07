import get from 'lodash-es/get';
import * as React from 'react';
import { getConvertedDate } from '../../../utils';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
import './LiteratureClock.sass';

interface Props {
  showBookAndAuthor: boolean;
  centerText: boolean;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  local?: Data;
  setLocal: (state: Data) => void;
}

interface State {
  time: Date;
}

interface Data {
  time?: string;
  quote_first?: string;
  quote_time_case?: string;
  quote_last?: string;
  title: string;
  author?: string;
}

class LiteratureClock extends React.PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    showBookAndAuthor: true,
    centerText: false
  };
  state: State = { time: getConvertedDate() };
  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className={`LiteratureClock ${this.props.centerText ? 'center' : ''}`}>
        <blockquote>
          <span className="quote_first">
            {get(this.props, 'local.quote_first')}
          </span>
          <strong className="quote_time_case">
            {get(this.props, 'local.quote_time_case')}
          </strong>
          <span className="quote_last">
            {get(this.props, 'local.quote_last')}
          </span>
        </blockquote>
        {this.props.showBookAndAuthor &&
          <cite>
            - <span id="book">
                {get(this.props, 'local.title')}
              </span>
            , <span id="author">
                {get(this.props, 'local.author')}
              </span>
          </cite>
        }
      </div>
    );
  }

  // Get current time code
  private getTimeCode() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let timeCode = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
    return timeCode;
  }

  // Get quote by time code
  private async getQuoteByTime(): Promise<Data> {
    let timeCode = this.getTimeCode();
    const res = await fetch(`https://github.com/lbngoc/literature-clock/raw/master/docs/times/${timeCode}.json`);
    const body = await res.json();
    let timeQuote: Data = {
      title: 'Too many requests at this time'
    };
    if (res.status === 429) {
      return timeQuote;
    }
    timeQuote = body[Math.floor(Math.random() * body.length)];
    window.console.log(timeQuote);
    return timeQuote;
  }

  private tick = () => {
    this.setState({ time: getConvertedDate() });
    let timeCode = this.getTimeCode();
    if (this.props.local && timeCode !== this.props.local.time) {
      this.getQuoteByTime().then(quote => quote && this.props.setLocal(quote));
    }
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(LiteratureClock);
