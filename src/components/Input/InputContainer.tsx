import React, {useState} from "react";
import { Paper, Typography, Collapse } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from './InputCard'

const useStyle = makeStyles((theme) => ({
  root: {
    width: '300px',
    marginTop: theme.spacing(1),
  },
  addCard: {
    cursor:'pointer',
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    backgroundColor: "#ebecf0",
    "&:hover": {
      backgroundColor: fade('#000', 0.25),
    },
  },
}));

interface contProps {
  listId: any
  type:any
}

const InputContainer: React.FC<contProps> = (props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={props.listId} type={props.type} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.addCard}
          elevation={0}
          onClick={() => setOpen(!open)}
        >
          <Typography>{props.type === 'card' ? '+ Add a Card' : '+ Add a list'}</Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

export default InputContainer;
