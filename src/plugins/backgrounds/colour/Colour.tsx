import React from 'react';

import { Props } from './types';

const Colour: React.FC<Props> = ({ data: { colour = '#3498db' } }) => (
  <div className="Colour fullscreen" style={{ backgroundColor: colour }} />
);

export default Colour;
