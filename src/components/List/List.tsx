import React, { useState } from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card";
import InputContainer from '../Input/InputContainer'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ColorButton from '../ColorButton/ColorButton'


interface Props {
  list: {
    id: string
    title: string
    cards: [
      {
        id: string,
      title: string}
    ]
  }    
  index: number
}




const List: React.FC<Props> = (props) => {
  const [cardColor, setcardColor] = useState("#ebebeb");
  
  let id = props.list.id;

  const useStyle = makeStyles((theme) => ({
    root: {
      width: "100wh",
      backgroundColor: `${cardColor}`,
      marginLeft: theme.spacing(1),
    },
    cardContainer: {
      marginTop: theme.spacing(4),
    },
  }));
  const classes = useStyle();

  const changeColorList = (color) => {    
setcardColor(color)

};


  return (
    <Draggable draggableId={props.list.id} index={props.index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={props.list.title} listId={props.list.id} />
            <Droppable droppableId={id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {props.list.cards.map((card, idx) => {
                    let id = card.id;

                    return (
                      <Card
                        key={id}
                        list={props.list.id}
                        card={card}
                        index={idx}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer type="card" listId={props.list.id} />
            <ColorButton changeColorList={changeColorList}></ColorButton>
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export default List;
