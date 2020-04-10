import React, { FC, useState } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

let instanceCounter = 0;

interface DnDProps {
  template: (item: any) => any;
  move: (id: string, newPos: number) => void;
  items: any[];
}

/**
 * A simplified drag-and-drop component
 * @param items An array of data
 * @param template A function that should return a React object as a drag and drop element.
 * @param move When an object is moved, this function will be called
 */
const DnD: FC<DnDProps> = ({ move, items, template }) => {
  const [droppableId] = useState(`drag-droppable-${instanceCounter++}`);

  const onDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;
    move(result.draggableId, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => {
              console.log(provided.placeholder);
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* overflow:auto contains any margins inside the template so the drag and drop takes them into account */}
                      <div style={{ overflow: 'auto' }}>{template(item)}</div>
                    </div>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DnD;
