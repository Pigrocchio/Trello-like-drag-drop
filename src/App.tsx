import React, { useState } from "react";
import List from "./components/List/List";
import store from "./utils/store";
import StoreApi from "./utils/storeApi";
import InputContainer from "./components/Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const { v4: uuidv4 } = require("uuid");

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "green",
    width: "100%",
    overflowY: "auto",
  },
  listContainer: {
    display: "flex",
  },
}));

const App: React.FC = () => {
  const [data, setData] = useState(store);
  const classes = useStyle();

  const addMoreCard = (title: any, listId: any) => {
    console.log(title, listId);
    const newCardId = uuidv4();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };

    setData(newState);
  };

  const addMoreList = (title: any) => {
    console.log(title);
    const newListId = uuidv4();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const updateListTitle = (title: any, listId: any) => {
    console.log(title);
    const list = data.lists[listId];
    list.title = title;
    const newState = {
      ...data,
      list: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(
      "destination",
      destination,
      "source",
      source,
      "id",
      draggableId
    );

    if (!destination) {
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];

    // filter the card that we are dragging
      const draggingCard = sourceList.cards.filter(
        (card) => card.id === draggableId
      )[0];

    // Drop in the same List habit
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1); // cut the source card index in the array
      destinationList.cards.splice(destination.index, 0, draggingCard); // paste the  draggingCard to destionation array index
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);

    }
  };

  return (
    // 0 create.reactcontex.provider
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.root}>
          <div className={classes.listContainer}>
            {data.listIds.map((listId: any) => {
              const list = data.lists[listId];

              return <List list={list} key={listId} />;
            })}
            <InputContainer listId={""} type="list" />
          </div>
        </div>
      </DragDropContext>
    </StoreApi.Provider>
  );
};

export default App;
