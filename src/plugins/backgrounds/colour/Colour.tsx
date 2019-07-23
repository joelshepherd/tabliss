import React, { FC } from 'react';

import Backdrop from '../../../views/shared/Backdrop';
import { Props, defaultData } from './types';

const Colour: FC<Props> = ({ data = defaultData }) => (
  <Backdrop
    className="Colour fullscreen"
    style={{ backgroundColor: data.colour }}
  />
);

export default Colour;
