import  React, {useContext } from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import CancelIcon from "@material-ui/icons/Cancel";
import StoreApi from "../utils/storeApi";


const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
  },
  MuiSvgIconroot: {
    height: "1.8vh",
    fill: "indianred",

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
   const { deleteCard  } = useContext(StoreApi);
 
 
  const handelBtnDelete = () => {
    deleteCard(props.card.id)
  };
  

  return (
    <Draggable draggableId={props.card.id.toString()} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            {props.card.title}{" "}
            <CancelIcon
              className={classes.MuiSvgIconroot}
              onClick={handelBtnDelete}
            />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

export default Card