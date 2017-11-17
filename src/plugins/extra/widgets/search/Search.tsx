import * as React from 'react';
import tlds from 'tlds';
import { Engine } from './interfaces';
import './Search.sass';
const engines: Engine[] = require('./engines.json');

interface Props {
  engine: string;
}

interface State {
  query: string;
}

class Search extends React.PureComponent<Props, State> {
  static defaultProps = { engine: 'google' };
  state = { query: '' };

  render() {
    return (
      <form className="Search" onSubmit={this.search}>
        <input
          autoFocus={true}
          type="search"
          value={this.state.query}
          onChange={event => this.setState({ query: event.target.value })}
          placeholder="Type to search"
        />
      </form>
    );
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
    if (query.startsWith('http://') || query.startsWith('https://')) {
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

export default Search;
