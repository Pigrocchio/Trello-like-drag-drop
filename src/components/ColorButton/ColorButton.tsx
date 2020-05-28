import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  root: {},
  orange: {
    color: "#ffc107",
   
  },
  green: {
    color: "#ccff90",
   
  },
  default: {
    color: "#e0e0e0",
   
  },
  blue: {
    color: "#80d8ff",
   
  },
  red: {
    color: "#ef9a9a",
    
  },
}));


interface ColorButtonProps {
  changeColorList: any
}


const ColorButton = ({ changeColorList }: ColorButtonProps) => {
  const classes = useStyle();

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value)
      changeColorList(event.target.value);
  };

  return (
    <div>
      <Radio
        className={classes.green}
        checked={selectedValue === "green"}
        onChange={handleChange}
        value="#ccff90"
        name="radio-button-green"
        inputProps={{ "aria-label": "green" }}
        size="small"
      />
      <Radio
        className={classes.orange}
        checked={selectedValue === "orange"}
        onChange={handleChange}
        value="#ffc107"
        name="radio-button-orange"
        inputProps={{ "aria-label": "orange" }}
        size="small"
      />
      <Radio
        className={classes.default}
        checked={selectedValue === "grey"}
        onChange={handleChange}
        value="#e0e0e0"
        name="radio-button-grey"
        inputProps={{ "aria-label": "grey" }}
        size="small"
      />
      <Radio
        className={classes.blue}
        checked={selectedValue === "blue"}
        onChange={handleChange}
        value="#80d8ff"
        name="radio-button-blue"
        inputProps={{ "aria-label": "blue" }}
        size="small"
      />
      <Radio
        className={classes.red}
        checked={selectedValue === "red"}
        onChange={handleChange}
        value="#ef9a9a"
        name="radio-button-red"
        inputProps={{ "aria-label": "red" }}
        size="small"
      />
    </div>
  );
}

export default ColorButton
