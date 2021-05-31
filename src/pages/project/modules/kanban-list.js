import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import List, { CardList } from "../_components/list";
import Card from "../_components/card";

export const KanbanList = (props) => {
  const { title, cards, droppableId } = props;
  const [addCard, setAddCard] = useState(false);

  const addCardCheck = () => {
    if (title === "Backlog") {
      return setAddCard;
    }
    return false;
  };
  return (
    <List
      title={title}
      droppableId={droppableId}
      setAddCard={addCardCheck()}
      empty={!cards.length && !addCard}
    >
      <>
        <CardList.Body>
          {addCard && <Card listId={droppableId} setAddCard={setAddCard} edit task={{}} />}
          {cards}
        </CardList.Body>
      </>
    </List>
  );
};
