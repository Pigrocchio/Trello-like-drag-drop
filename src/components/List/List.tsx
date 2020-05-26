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
    cards: []
  }    
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
    <Paper className={classes.root}>
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

              
              return < Card key = { idx } card = { card } index = { idx } />
              
})}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <InputContainer type="card" listId={props.list.id} />
    </Paper>
  );
};

export default List;
