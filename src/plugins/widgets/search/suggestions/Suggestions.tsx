import * as React from 'react';
import { SuggestionsResult } from './interfaces';
import getSuggestions from './getSuggestions';
import './Suggestions.sass';

interface Props {
  query?: string;
  selected?: number;
  quantity?: number;
  onMouseOver?: (event: React.MouseEvent<HTMLInputElement>, key: number) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLInputElement>, key: number) => void;
  onMouseClick?: (event: React.MouseEvent<HTMLInputElement>, key: number) => void;
}

interface State {
  suggestions?: SuggestionsResult;
}

class Suggestions extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    query: '',
    selected: -1,
    quantity: 4,
    onMouseOver: undefined,
    onMouseOut: undefined,
    onMouseClick: undefined,
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

    let suggestionsList = suggestions[1].map((element: string, key: number) => {
      let className = '';

      if (key >= this.props.quantity!) {
        return;
      }

      if (key === this.props.selected!) {
        className = 'active';
      }

      return (
        <input
          type="button"
          key={key}
          className={className}
          value={element}
          onMouseOver={event => this.props.onMouseOver!(event, key)}
          onMouseOut={event => this.props.onMouseOut!(event, key)}
          onClick={event => this.props.onMouseClick!(event, key)}
        />
      );
    });

    return (
      <div className="Suggestions">
        {suggestionsList}
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
