import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";
import StoreApi from "../../utils/storeApi";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

interface InputCardProps {
  setOpen: any;
  listId: any;
  type: any
}

const InputCard = ({ setOpen, listId, type }: InputCardProps) => {
  // const InputCard: React.FC<InputCardProps> = (props) => {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(StoreApi);
  const [title, setTitle] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handelBtnConfim = () => {
    if (type === 'card') {
      addMoreCard(title, listId);
      setTitle("");
      setOpen(false);
    }
    else {
      addMoreList(title)
      setTitle("");
      setOpen(false);
    }
  };

  const handleBlur = () => {
    setOpen(false);
   
  }

  return (
    <>
      <div>
        <Paper className={classes.card}>
          <InputBase
            
            onChange={handleOnChange}
            onBlur={handleBlur}
            multiline
            fullWidth
            inputProps={{ classes: classes.input }}
            value={title}
            placeholder={
              type === "card"
                ? "Enter a title of this card"
                : "Enter list title"
            }
          />
        </Paper>
      </div>
      <div  className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handelBtnConfim}>
          {type === "card" ? "Add Card" : "Add list"}
        </Button>
        <IconButton  onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </>
  );
};

export default InputCard;
