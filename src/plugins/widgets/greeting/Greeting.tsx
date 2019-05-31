import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getConvertedDate } from '../../../utils';
import { messages } from './messages';

interface Props {
  name?: string;
}

interface State {
  hour: number;
}

class Greeting extends React.PureComponent<Props & InjectedIntlProps, State> {
  state = {
    hour: getConvertedDate().getHours(),
  };

  private interval: number;

  componentWillMount() {
    this.interval = window.setInterval(
      () => this.setState({ hour: getConvertedDate().getHours() }),
      1000,
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Greeting">
        <h2>{this.greeting}</h2>
      </div>
    );
  }

  get greeting() {
    return this.props.name
      ? this.props.intl.formatMessage(messages.greetingWithName, {
          hour: this.state.hour,
          name: this.props.name,
        })
      : this.props.intl.formatMessage(messages.greeting, {
          hour: this.state.hour,
        });
  }
}

export default injectIntl(Greeting);
