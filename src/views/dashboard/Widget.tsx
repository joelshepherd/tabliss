import React, { FC } from 'react';

import { WidgetDisplay } from '../../store/reducers/types';

const Widget: FC<WidgetDisplay> = ({
  children,
  colour,
  outlineOpacity,
  outlineColour,
  outlineWidth,
  fontFamily,
  fontSize = 24,
  fontWeight,
}) => (
  <div
    className={`Widget ${fontWeight ? 'weight-override' : ''}`}
    style={{
      color: colour,
      fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight,
      WebkitTextStrokeWidth: `${outlineWidth}px`,
      WebkitTextStrokeColor: outlineColour + ((undefined === outlineOpacity) ? "" : outlineOpacity.toString(16))

    }}
  >
    {children}
  </div>
);

export default Widget;
