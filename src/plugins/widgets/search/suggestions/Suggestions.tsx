import React, { FC } from 'react';

import { SuggestionsData } from './interfaces';
import './Suggestions.sass';

type Props = {
  data: SuggestionsData;
  onMouseOver: (e: React.MouseEvent<HTMLInputElement>, key: number) => void;
  onMouseOut: (e: React.MouseEvent<HTMLInputElement>, key: number) => void;
  onMouseClick: (e: React.MouseEvent<HTMLInputElement>, key: number) => void;
};

const Suggestions: FC<Props> = ({
  data,
  onMouseClick,
  onMouseOut,
  onMouseOver,
}) => (
  <div className="Suggestions">
    {data.values.map((element, key) => (
      <input
        type="button"
        key={key}
        className={key === data.active ? 'active' : ''}
        value={element}
        onMouseOver={event => onMouseOver(event, key)}
        onMouseOut={event => onMouseOut(event, key)}
        onClick={event => onMouseClick(event, key)}
      />
    ))}
  </div>
);

export default Suggestions;
