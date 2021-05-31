import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

export const withDraggable = (draggableId) => Component => (props) => {
  return (
    <Draggable draggableId={draggableId} index={props.index}>
      {({innerRef, draggableProps, dragHandleProps}) => (
        <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <Component {...props} />
        </div>
      )}
    </Draggable>
  );
}

export const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};