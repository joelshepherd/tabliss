import React from 'react';

import { Gif } from './types';
const giphyLogo = require('./giphy-logo.png');

type Props = Gif;

const Credit: React.FC<Props> = ({ data, link }) => (
  <div className="credit">
    <a
      href={link || 'https://giphy.com/'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={giphyLogo} />
    </a>
  </div>
);

export default Credit;
