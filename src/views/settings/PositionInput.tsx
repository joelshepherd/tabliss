import React, { FC } from 'react';

import { WidgetPosition } from '../../store/reducers/types';
import './PositionInput.css';

const positions = [
  {
    value: 'topLeft',
    icon: 'arrow-up-left',
  },
  {
    value: 'topCentre',
    icon: 'arrow-up',
  },
  {
    value: 'topRight',
    icon: 'arrow-up-right',
  },
  {
    value: 'middleLeft',
    icon: 'arrow-left',
  },
  {
    value: 'middleCentre',
    icon: 'move',
  },
  {
    value: 'middleRight',
    icon: 'arrow-right',
  },
  {
    value: 'bottomLeft',
    icon: 'arrow-down-left',
  },
  {
    value: 'bottomCentre',
    icon: 'arrow-down',
  },
  {
    value: 'bottomRight',
    icon: 'arrow-down-right',
  },
] as const;

type Props = {
  value: WidgetPosition;
  onChange: (value: WidgetPosition) => void;
};

const PositionInput: FC<Props> = ({ value, onChange }) => (
  <div className="PositionInput">
    <label>Position</label>

    <div className="grid">
      {positions.map((position, i) => {
        const splitPosition = position.value.split(/(?=[A-Z])/);

        let positionX = 'start',
          positionY = 'start';

        switch (splitPosition[0].toLowerCase()) {
          case 'middle':
            positionY = 'center';
            break;

          case 'bottom':
            positionY = 'end';
            break;
        }

        switch (splitPosition[1].toLowerCase()) {
          case 'centre':
            positionX = 'center';
            break;

          case 'right':
            positionX = 'end';
            break;
        }

        return (
          <div
            key={i}
            className="position-rectangle"
            style={{
              alignSelf: positionY,
              justifySelf: positionX,
              borderColor: value === position.value ? '#3498db' : '#4e4e4e',
            }}
            onClick={() => onChange(position.value)}
          />
        );
      })}
    </div>
  </div>
);

export default PositionInput;
