import React, { FC } from 'react';

import { WidgetPosition } from '../../store/reducers/data';
import './PositionInput.css';
import { IconButton, Icon } from '../shared';

const positions = [
  {
    value: 'topLeft',
    icon: require('feather-icons/dist/icons/arrow-up-left.svg'),
  },
  {
    value: 'topCentre',
    icon: require('feather-icons/dist/icons/arrow-up.svg'),
  },
  {
    value: 'topRight',
    icon: require('feather-icons/dist/icons/arrow-up-right.svg'),
  },
  {
    value: 'middleLeft',
    icon: require('feather-icons/dist/icons/arrow-left.svg'),
  },
  {
    value: 'middleCentre',
    icon: require('feather-icons/dist/icons/move.svg'),
  },
  {
    value: 'middleRight',
    icon: require('feather-icons/dist/icons/arrow-right.svg'),
  },
  {
    value: 'bottomLeft',
    icon: require('feather-icons/dist/icons/arrow-down-left.svg'),
  },
  {
    value: 'bottomCentre',
    icon: require('feather-icons/dist/icons/arrow-down.svg'),
  },
  {
    value: 'bottomRight',
    icon: require('feather-icons/dist/icons/arrow-down-right.svg'),
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
      {positions.map(position => (
        <IconButton
          key={position.value}
          onClick={() => onChange(position.value)}
          primary={value === position.value}
        >
          <Icon svg={position.icon} />
        </IconButton>
      ))}
    </div>
  </div>
);

export default PositionInput;
