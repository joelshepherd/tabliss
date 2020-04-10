import React, { FC } from 'react';

import { WidgetState } from '../../store/reducers/types';
import Widget from './Widget';
import DnD from '../shared/DnD';

interface DnDProps {
  widgets: WidgetState[];
  moveWidget: (widgetID: string, newPos: number) => void;
  removeWidget: (widgetID: string) => void;
}

export const WidgetsDnD: FC<DnDProps> = ({
  widgets,
  moveWidget,
  removeWidget,
}) => {
  return (
    <DnD
      move={moveWidget}
      items={widgets}
      template={widget => (
        <Widget
          key={widget.id}
          plugin={widget}
          onRemove={() => removeWidget(widget.id)}
        />
      )}
    />
  );
};

export default WidgetsDnD;
