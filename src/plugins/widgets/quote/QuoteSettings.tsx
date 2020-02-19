import React, { FC } from 'react';

import categories from './categories';
import { Props, defaultData } from './types';
import { CustomInput } from 'reactstrap';

const QuoteSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <CustomInput
      id="quoteAllCatagories"
      type="radio"
      checked={data.category === undefined}
      onChange={() => setData({ category: undefined })}
      label="All Categories"
    />

    {categories.map(category => (
      <CustomInput
        id={`quote${category.key}`}
        key={category.key}
        type="radio"
        checked={data.category === category.key}
        onChange={() => setData({ category: category.key })}
        label={category.name}
      />
    ))}

    <br />

    <p>
      Powered by{' '}
      <a
        href="https://theysaidso.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        They Said So
      </a>
      {' and '}
      <a
        href="http://www.developerexcuses.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer Excuses
      </a>
      .
    </p>
  </div>
);

export default QuoteSettings;
