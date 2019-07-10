import React, { FC } from 'react';

import { WidgetDisplay } from '../../store/reducers/profile';

const Widget: FC<WidgetDisplay> = ({
  children,
  colour,
  fontSize = 24,
  fontFamily,
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
