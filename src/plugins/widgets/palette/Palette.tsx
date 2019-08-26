import React, { FC } from 'react';

import { useCachedEffect } from '../../../hooks';
import { getRandomColorPalette } from './api';
import { Props, defaultData } from './types';
import Color from './Color';
import './Palette.sass';

const EXPIRE_IN = 60 * 60 * 1000; // 1 hour

const Palette: FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  useCachedEffect(
    () => {
      getRandomColorPalette(loader).then(setCache);
    },
    cache ? cache.timestamp + EXPIRE_IN : 0,
    [data.palette],
  );

  if (!cache) {
    return null;
  }

  function showResultPalette() {
    if (cache && cache.palette) {
      return cache.palette.map((palette, index) => (
        <Color key={index} displayColor={palette} />
      ));
    } else {
      return null;
    }
  }

  return <div className="Palette">{showResultPalette()}</div>;
};

export default Palette;
