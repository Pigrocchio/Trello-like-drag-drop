import React, { useState, useContext } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import storeApi from '../../utils/storeApi'


const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    "&:focus": {
      background: "#ddd",
    },
  },
}));


interface Props {
  title: string;
  listId:any
}

const Title: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  const { updateListTitle} = useContext(storeApi)
  const [newTitle, setNewTitle] = useState(props.title)
  const handleOnChange = (e:any) => {
setNewTitle(e.target.value)
  }

  const handleOnBlur = () => {
    updateListTitle(newTitle, props.listId);
    setOpen(false)
  }

  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            inputProps={{ className: classes.input }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {props.title}
          </Typography>
          <MoreHorizIcon></MoreHorizIcon>
        </div>
      )}
    </div>
  );
};

export default Title;
