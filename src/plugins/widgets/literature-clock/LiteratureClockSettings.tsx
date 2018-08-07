import * as React from 'react';
import { Settings } from '../../interfaces';

interface Props {
  showBookAndAuthor: boolean;
  centerText: boolean;
  onChange: (settings: Settings) => void;
}

class LiteratureClockSettings extends React.PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    showBookAndAuthor: true,
    centerText: false
  };

  render() {
    return (
      <div className="LiteratureClockSettings">
        <label>
          <input
            type="checkbox"
            checked={this.props.showBookAndAuthor}
            onChange={() => this.props.onChange({showBookAndAuthor: ! this.props.showBookAndAuthor})}
          />
          {' '}
          Display book and author
        </label>
        <label>
          <input
            type="checkbox"
            checked={this.props.centerText}
            onChange={() => this.props.onChange({centerText: ! this.props.centerText})}
          />
          {' '}
          Align text at center
        </label>
      </div>
    );
  }
}

export default LiteratureClockSettings;
