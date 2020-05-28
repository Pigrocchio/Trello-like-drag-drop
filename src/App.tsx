import React, { useState } from "react";
import List from "./components/List/List";
import store from "./utils/store";
import StoreApi from "./utils/storeApi";
import InputContainer from "./components/Input/InputContainer";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import { v4 as uuidv4 } from 'uuid'
require("dotenv").config();





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
  const [open, setOpen] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

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

  const deleteCard = (cardId) => {
    
    

    


    const entries = Object.entries(data.lists)
    console.log('entries', entries)
    let result:any = []
    entries.map(x => {
      x.map(x => {        
       result.push(x)
      })
    })
    console.log(result)
  }
  

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
    const { destination, source, draggableId, type } = result;
    console.log(
      "destination",
      destination,
      "source",
      source,
      "id",
      draggableId
    );
    // Darg if null
    if (!destination) {
      return;
    }
    // Drag list horizontally
    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1); // delete the listid of the corresponding index in the soruce list
      newListIds.splice(destination.index, 0, draggableId);

      return;
    }
    // Drag Cards
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];

    // filter the card that we are dragging
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    // Drop  cards in the same Listid habit
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
    } else {
      // Drage cards in different listid
      sourceList.cards.splice(source.index, 1); // cut the source card index in the array
      destinationList.cards.splice(destination.index, 0, draggingCard); // paste the  draggingCard to destionation array index
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newSate);
    }
  };

  return (
    // 0 create.reactcontex.provider
    <StoreApi.Provider
      value={{ deleteCard, addMoreCard, addMoreList, updateListTitle }}
    >
      <div
        className={classes.root}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: `${backgroundColor}`,
        }}
      >
        <TopBar setOpen={setOpen} />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided: any) => (
              <div
                className={classes.listContainer}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId: any, idx: number) => {
                  const list = data.lists[listId];

                  return <List list={list} key={listId} index={idx} />;
                })}
                <InputContainer listId={""} type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <SideMenu
          setBackgroundUrl={setBackgroundUrl}
          setBackgroundColor={setBackgroundColor}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </StoreApi.Provider>
  );
};

export default App;
