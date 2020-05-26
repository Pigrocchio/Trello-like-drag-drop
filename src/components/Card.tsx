import * as React from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";



const useStyle = makeStyles((theme) => ({
  card: {
        padding: theme.spacing(1,1,1,2),
      margin: theme.spacing(1)
  },
}));

interface Props {
  card: {
    id: string,
    title: string
  }
  key: any
  index: any
  
}

const Card: React.FC<Props> = (props) => {
  const classes = useStyle();
  let idnumber = props.index + ''
 


  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>{props.card.title}</Paper>
        </div>
      )}
    </Draggable>
  );
}

export default Card