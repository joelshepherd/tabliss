import * as React from 'react';
import tlds from 'tlds';
import './Search.sass';

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
          placeholder="Search or url"
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
    return `https://www.${this.props.engine}.com/search?q=${query}`;
  }
}

export default Search;
