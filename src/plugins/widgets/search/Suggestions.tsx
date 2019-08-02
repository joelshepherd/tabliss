import React, { FC } from 'react';

import './Suggestions.sass';

type Props = {
  active?: number;
  setActive: (active?: number) => void;
  suggestions: string[];
  onSelect: (suggestion: string) => void;
};

const Suggestions: FC<Props> = ({
  active,
  setActive,
  suggestions,
  onSelect,
}) => {
  return (
    <div className="Suggestions">
      {suggestions.map((suggestion, index) => (
        <input
          type="button"
          key={index}
          className={index === active ? 'active' : ''}
          value={suggestion}
          onClick={() => onSelect(suggestion)}
          onMouseEnter={() => setActive(index)}
          onMouseLeave={() => setActive(undefined)}
        />
      ))}
    </div>
  );
};

export default Suggestions;
