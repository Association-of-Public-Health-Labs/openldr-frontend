import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import { FiColumns, FiPlus, FiX } from "react-icons/fi";
import { ThemeContext } from "styled-components";

import { Container, Theme } from "./styles";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(6),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(6),
    },
  },
}));

export default function SpeedDials() {
  const classes = useStyles();
  const [direction, setDirection] = useState("up");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  function handleClickSpeedDial() {
    setOpen(!open);
  }

  return (
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        hidden={hidden}
        icon={open ? <FiX size={24} /> : <FiPlus size={24} />}
        open={open}
        onClick={handleClickSpeedDial}
        direction={direction}
      />
    </ThemeProvider>
  );
}
