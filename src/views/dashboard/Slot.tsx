import React, { FC } from 'react';

import Plugin from '../../components/plugin/Plugin';
import { getPlugin } from '../../plugins';
import { WidgetPosition, WidgetState } from '../../store/reducers/profile';
import './Slot.sass';

type Props = {
  position: WidgetPosition;
  widgets: WidgetState[];
};

const Slot: FC<Props> = ({ position, widgets }) => (
  <div className={`Slot ${position}`}>
    {widgets.map(({ id, type }) => (
      <Plugin key={id} id={id} Component={getPlugin(type).Dashboard} />
    ))}
  </div>
);

export default Slot;
