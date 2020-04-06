import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { Theme, UseStyles } from "./styles";

export default function Btn({ label, onclick }) {
  const classes = UseStyles();
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="primary"
        className={classes.margin}
        type="submit"
        onClick={onclick}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
}
