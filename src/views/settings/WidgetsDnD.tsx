import React, { FC } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

import { WidgetState } from '../../store/reducers/types';
import Widget from './Widget';

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
  const onDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;

    const { draggableId, destination } = result;

    moveWidget(draggableId, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="widget-droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {widgets.map((widget, index) => (
              <Draggable key={widget.id} draggableId={widget.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Widget
                      key={widget.id}
                      plugin={widget}
                      onRemove={() => removeWidget(widget.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default WidgetsDnD;
