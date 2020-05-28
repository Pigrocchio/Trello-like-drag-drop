import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Card from "../Card";
import InputContainer from '../Input/InputContainer'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { listenerCount } from "process";


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



const useStyle = makeStyles((theme) => ({
  root: {
    width: "100wh",
    backgroundColor: "#ebebeb",
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

const List: React.FC<Props> = (props) => {
  const classes = useStyle();
  let id = props.list.id;
  
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

                    return <Card key={id} list={props.list.id} card={card} index={idx} />;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer type="card" listId={props.list.id} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export default List;
