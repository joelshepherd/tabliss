import React from 'react';
import { SuggestionsData } from './interfaces';
import './Suggestions.sass';

interface Props {
  data?: SuggestionsData;
  onMouseOver?: (
    event: React.MouseEvent<HTMLInputElement>,
    key: number,
  ) => void;
  onMouseOut?: (event: React.MouseEvent<HTMLInputElement>, key: number) => void;
  onMouseClick?: (
    event: React.MouseEvent<HTMLInputElement>,
    key: number,
  ) => void;
}

interface State {}

class Suggestions extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    data: undefined,
    onMouseOver: undefined,
    onMouseOut: undefined,
    onMouseClick: undefined,
  };

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const suggestions = data.values.map((element, key) => (
      <input
        type="button"
        key={key}
        className={key === data.active ? 'active' : ''}
        value={element}
        onMouseOver={event => this.props.onMouseOver!(event, key)}
        onMouseOut={event => this.props.onMouseOut!(event, key)}
        onClick={event => this.props.onMouseClick!(event, key)}
      />
    ));

    return <div className="Suggestions">{suggestions}</div>;
  }
}

export default Suggestions;
