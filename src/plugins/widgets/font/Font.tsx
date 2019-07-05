import { FC, useEffect } from 'react';

import { Props, defaultData } from './types';
import './Font.sass';

const classNames = [
  'weight--',
  'weight--100',
  'weight--300',
  'weight--400',
  'weight--500',
  'weight--700',
  'weight--900',
];

const Font: FC<Props> = ({ data = defaultData }) => {
  useEffect(() => {
    const element = document.querySelector('.Widgets') as HTMLDivElement;

    element.style.fontFamily = data.family || null;
    element.style.fontSize = data.size ? `${data.size}px` : null;
    element.style.color = data.colour || null;

    element.classList.remove(...classNames);
    element.classList.add(`weight--${data.weight}`);

    return () => {
      element.style.fontFamily = null;
      element.style.fontSize = null;
      element.style.color = null;

      element.classList.remove(...classNames);
    };
  }, [data]);

  return null;
};

export default Font;
