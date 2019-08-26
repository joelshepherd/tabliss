import React, { FC } from 'react';

import { ColorProps } from './types';

const Color: FC<ColorProps> = ({ displayColor }) => {
  if (!displayColor) {
    return null;
  }

  function getStyle(): Object {
    return {
      backgroundColor: `rgb(${displayColor[0]}, ${displayColor[1]}, ${
        displayColor[2]
      })`,
    };
  }

  return (
    <>
      <div className="Color" style={getStyle()} />
    </>
  );
};

export default Color;
