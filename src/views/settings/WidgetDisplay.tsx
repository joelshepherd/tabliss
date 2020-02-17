import React, { FC } from 'react';

import { WidgetDisplay } from '../../store/reducers/types';
import PositionInput from './PositionInput';
import { CustomInput, Label } from 'reactstrap';

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

      <Label for="WidgetSizeSelector">Size</Label>
      <CustomInput
        type="range"
        id="WidgetSizeSelector"
        value={display.fontSize}
        min="2"
        max="100"
        step="2"
        onChange={event => onChange({ fontSize: Number(event.target.value) })}
      />
    </div>
  );
};

export default WidgetDisplay;
