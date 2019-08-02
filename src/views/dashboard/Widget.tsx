import React, { FC } from 'react';

import { WidgetDisplay } from '../../store/reducers/types';

const Widget: FC<WidgetDisplay> = ({
  children,
  colour,
  fontFamily,
  fontSize = 24,
  fontWeight = 400,
}) => (
  <div
    className="Widget"
    style={{
      color: colour,
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
    }}
  >
    {children}
  </div>
);

export default Widget;
