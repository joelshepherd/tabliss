import * as React from 'react';
const categories: Category[] = require('./categories.json');

interface Category {
  key: string;
  name: string;
}

interface Props {
  category?: string;
  placeholder: string;
  onChange: (settings: { [key: string]: string|undefined }) => void;
}

class QuoteSettings extends React.PureComponent<Props> {
  render() {
    return (
      <div className="QuoteSettings">
        <label>
          <input
            type="radio"
            checked={this.props.category === undefined}
            onChange={() => this.selectCategory(undefined)}
          />
          {' '}
          All Categories
        </label>

        {categories.map(category =>
          <label key={category.key}>
            <input
              type="radio"
              checked={this.props.category === category.key}
              onChange={() => this.selectCategory(category.key)}
            />
            {' '}
            {category.name}
          </label>
        )}

        <p>Powered by <a href="https://theysaidso.com" target="_blank" rel="noopener noreferrer">They Said So</a>.</p>
      </div>
    );
  }

  private selectCategory(category?: string) {
    this.props.onChange({ category });
  }
}

export default QuoteSettings;
