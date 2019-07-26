import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import tlds from 'tlds';

import { engines } from './engines';
import { Suggestions } from './suggestions';
import getSuggestions from './suggestions/getSuggestions';
import { SuggestionsResult, SuggestionsData } from './suggestions/interfaces';
import { Props, defaultData } from './types';
import './Search.sass';

interface State {
  query: string;
  getSuggestionData: boolean;
  suggestions: SuggestionsData;
}

const messages = defineMessages({
  placeholder: {
    id: 'plugins.search.placeholder',
    description: 'Placeholder text to show in the search box before typing',
    defaultMessage: 'Type to search',
  },
});

class Search extends React.PureComponent<Props & WrappedComponentProps, State> {
  static defaultProps = {
    data: defaultData,
  };

  state: State = {
    query: '',
    getSuggestionData: false,
    suggestions: {
      active: -1,
      values: [],
    },
  };

  private searchInput: React.RefObject<HTMLInputElement> = React.createRef();
  private currentExecutionTime = 0;
  private oldQuery: string = '';

  componentDidUpdate() {
    this.getSuggestionData();
  }

  componentDidMount() {
    if (this.searchInput.current) {
      this.searchInput.current.focus();
    }
  }

  render() {
    const { data, intl } = this.props;

    return (
      <form className="Search" onKeyUp={this.keyUp} onSubmit={this.search}>
        <input
          ref={this.searchInput}
          autoFocus={true}
          tabIndex={1}
          type="text"
          value={this.state.query}
          onChange={event => {
            this.oldQuery = event.target.value;
            this.setState({
              query: event.target.value,
              getSuggestionData: true,
            });
          }}
          placeholder={
            data!.placeholder || intl.formatMessage(messages.placeholder)
          }
        />

        {data!.suggestionsEngine && (
          <Suggestions
            data={this.state.suggestions}
            onMouseOver={(event, key) =>
              this.setState({
                suggestions: { ...this.state.suggestions, active: key },
              })
            }
            onMouseOut={() =>
              this.setState({
                suggestions: { ...this.state.suggestions, active: -1 },
              })
            }
            onMouseClick={event => {
              const target = event.currentTarget;

              target.blur();
              this.searchInput.current!.focus();

              this.setState({
                query: target.value,
                getSuggestionData: true,
              });
            }}
          />
        )}
      </form>
    );
  }

  /**
   * Sets active suggestion on keyup and keydown
   */
  private keyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
    const { keyCode } = event;

    if (
      this.state.query === '' ||
      (keyCode !== 38 && keyCode !== 40) ||
      !this.props.data!.suggestionsEngine
    ) {
      return;
    }

    let quantity = this.state.suggestions.values.length;
    let { active } = this.state.suggestions;

    // 38 - Up arrow
    if (keyCode === 38) {
      active--;

      // Select last when nothing is selected
      if (active < -1) {
        active = quantity - 1;
      }
    }

    // 40 - Down arrow
    if (keyCode === 40) {
      active++;

      // Reset when nothing is selected
      if (active >= quantity) {
        active = -1;
      }
    }

    let query: string;

    // Show old query if nothing is selected
    if (active === -1) {
      query = this.oldQuery;
    } else {
      query = this.state.suggestions.values[active];
    }

    this.setState({
      query,
      suggestions: {
        ...this.state.suggestions,
        active,
      },
    });
  };

  private search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    document.location.assign(this.buildUrl(this.state.query));
  };

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
    const searchEngine =
      engines.find(engine => engine.key === this.props.data!.searchEngine) ||
      engines[0];

    return searchEngine.search_url.replace('{searchTerms}', query);
  }

  /**
   * Retrieves suggestion data
   */
  private getSuggestionData() {
    const { query, getSuggestionData } = this.state;

    // Disable suggestions for Firefox (they do not allow the required CSP)
    if (process.env.BUILD_TARGET === 'firefox') {
      return;
    }

    if (!getSuggestionData || !this.props.data!.suggestionsEngine) {
      return;
    }

    // To get the most recent result
    const executionTime = window.performance.now();

    if (!query) {
      this.setSuggestions(executionTime, undefined);
      return;
    }

    const suggestionEngine =
      engines.find(
        engine => engine.key === this.props.data!.suggestionsEngine,
      ) || engines[0];

    const suggestionUrl = suggestionEngine.suggest_url!.replace(
      '{searchTerms}',
      query,
    );

    getSuggestions(suggestionUrl, suggestions => {
      this.setSuggestions(executionTime, suggestions);
    });
  }

  /**
   * Sets suggestiondata in state
   */
  private setSuggestions(
    executionTime: number,
    suggestions?: SuggestionsResult,
  ) {
    // Only update with latest data
    if (executionTime < this.currentExecutionTime) {
      return;
    }

    this.currentExecutionTime = executionTime;

    let data: SuggestionsData;

    if (!suggestions) {
      data = {
        active: -1,
        values: [],
      };
    } else {
      data = {
        active: -1,
        values: suggestions[1].slice(0, this.props.data!.suggestionsQuantity),
      };
    }

    this.setState({
      getSuggestionData: false,
      suggestions: data,
    });
  }
}

export default injectIntl(Search);
