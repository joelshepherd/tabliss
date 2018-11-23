import * as React from 'react';
import { SuggestionsResult } from './interfaces';
import getSuggestions from './getSuggestions';

interface Props {
  query?: string;
}

interface State {
  suggestions?: SuggestionsResult;
}

class Suggestions extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    query: '',
  };
  state = { suggestions: undefined };

  private currentExecutionTime = 0;

  componentDidUpdate(prevProps: Props) {
    const { query } = this.props;

    // Don't fetch meaningless
    if (query === prevProps.query) {
      return;
    }

    // To get most recent result
    const executionTime = window.performance.now();

    if (!query) {
      this.setSuggestions(executionTime, undefined);
      return;
    }

    getSuggestions(query, suggestions => {
      this.setSuggestions(executionTime, suggestions);
    });
  }

  render() {
    const { suggestions } = this.state;

    if (!suggestions) {
      return null;
    }

    return (
      <div>
        {suggestions[0]}
      </div>
    );
  }

  private setSuggestions(executionTime: number, suggestions?: SuggestionsResult) {
    if (executionTime < this.currentExecutionTime) {
      return;
    }

    this.currentExecutionTime = executionTime;

    this.setState({ suggestions });
  }
}

export default Suggestions;
