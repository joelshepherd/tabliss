import get from 'lodash-es/get';
import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../../data';

interface Props {
  category?: string;
  local?: Data;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  setLocal: (state: Data) => void;
}

interface Data {
  author: string;
  date: number;
  quote: string;
}

class Quote extends React.PureComponent<Props> {
  componentWillMount() {
    if (new Date().getDate() !== get(this.props, 'local.date')) {
      this.getQuote(this.props).then(quote => this.props.setLocal(quote));
    }
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.category !== props.category) {
      this.getQuote(props).then(quote => this.props.setLocal(quote));
    }
  }

  render() {
    return (
      <h4 className="Quote">
        {get(this.props, 'local.quote')}
        <br />
        <sub>&mdash; {get(this.props, 'local.author')}</sub>
      </h4>
    );
  }

  private async getQuote({ category }: Props): Promise<Data> {
    const res = await fetch('https://quotes.rest/qod.json' + (category ? `?category=${category}` : ''));
    const body = await res.json();

    if (res.status === 429) {
      return {
        author: body.error.message.split('.')[1] + '.',
        date: 0,
        quote: 'Too many requests this hour.',
      };
    }

    return {
      author: get(body, 'contents.quotes[0].author'),
      date: new Date().getDate(),
      quote: get(body, 'contents.quotes[0].quote'),
    };
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(Quote);
