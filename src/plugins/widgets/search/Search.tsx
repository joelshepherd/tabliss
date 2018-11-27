import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import tlds from 'tlds';
import { Engine, Settings } from './interfaces';
import { Suggestions } from './suggestions';
import './Search.sass';
const engines: Engine[] = require('./engines.json');

interface Props extends Settings {}

interface State {
  query: string;
  selected: number;
}

const messages = defineMessages({
  placeholder: {
    id: 'plugins.search.placeholder',
    description: 'Placeholder text to show in the search box before typing',
    defaultMessage: 'Type to search',
  },
});

class Search extends React.PureComponent<Props & InjectedIntlProps, State> {
  static defaultProps = {
    engine: 'google',
    placeholder: '',
    suggestions: {
      active: false,
      quantity: 4,
    },
  };
  state = {
    query: '',
    selected: -1,
  };

  render() {
    return (
      <form className="Search" onSubmit={this.search}>
        <input
          autoFocus={true}
          tabIndex={1}
          type="search"
          value={this.state.query}
          onKeyUp={this.keyUp}
          placeholder={this.props.placeholder || this.props.intl.formatMessage(messages.placeholder)}
        />

        {
          this.props.active ?
            <Suggestions
              query={this.state.query}
              selected={this.state.selected}
              quantity={this.props.quantity}
              onMouseOver={(event, key) => this.setState({ selected: key })}
              onMouseOut={(event, key) => this.setState({ selected: -1 })}
              onMouseClick={(event) => this.setState({ query: event.currentTarget.value })}
            />
          :
            null
        }
      </form>
    );
  }

  private keyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let selected = this.state.selected;

    // 38 - Up arrow
    if (event.keyCode === 38) {
      selected--;

      // Select last when nothing is selected
      if (selected < -1) {
        selected = this.props.quantity! - 1;
      }
    }

    // 40 - Down arrow
    if (event.keyCode === 40) {
      selected++;

      // Reset when nothing is selected
      if (selected >= this.props.quantity!) {
        selected = -1;
      }
    }

    console.log(event.currentTarget);

    this.setState({
      query: event.currentTarget.value,
      selected,
    });
  }

  private search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    document.location.assign(
      this.buildUrl(this.state.query)
    );
  }

  /**
   * Build a navigatable URL from a query.
   *
   * @type {string}
   */
  private buildUrl(query: string) {
    // See if they have started with a web scheme
    if (/^https?:\/\/\w+/.test(query)) {
      return query;
    }

    // See if they have ended with a valid TLD
    if (tlds.some(tld => query.endsWith(`.${tld}`))) {
      return `https://${query}`;
    }

    // Probably searching then
    const searchEngine = engines
      .find(engine => engine.key === this.props.engine)
      || engines[0];

    return searchEngine.search_url.replace('{searchTerms}', query);
  }
}

export default injectIntl(Search);
