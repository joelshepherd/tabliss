import React, { FC } from 'react';

import { WidgetDisplay } from '../../store/reducers/types';
import PositionInput from './PositionInput';
import './WidgetDisplay.css';

type Props = {
  display: WidgetDisplay;
  onChange: (display: Partial<WidgetDisplay>) => void;
};

const WidgetDisplay: FC<Props> = ({ display, onChange }) => {
  return (
    <div className="WidgetDisplay">
      <PositionInput
        value={display.position}
        onChange={position => onChange({ position })}
      />

      <label>
        Size
        <br />
        <input
          type="range"
          value={display.fontSize}
          min="2"
          max="100"
          step="2"
          onChange={event => onChange({ fontSize: Number(event.target.value) })}
        />
      </label>
    </div>
  );
};

export default WidgetDisplay;
