import React, { FC } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

import LinkInput from './Input';
import { Link } from './types';

interface DnDProps {
  data: Link[];
  move: (id: string, newPos: number) => void;
  remove: (id: string) => void;
  change: (index: number, link: Link, values: Partial<Link>) => void;
}

export const LinkDnD: FC<DnDProps> = ({ data, move, remove, change }) => {
  const onDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;

    const { draggableId, destination } = result;

    move(draggableId, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="widget-droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((link, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <LinkInput
                      {...link}
                      key={index}
                      number={index + 1}
                      onChange={values => change(index, link, values)}
                      onRemove={() => remove(index.toString())}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LinkDnD;
