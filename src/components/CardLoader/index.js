import React, { useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeContext } from "styled-components";
import { ThemeProvider } from "@material-ui/core";

import { Progress, Theme } from "./styles";

export default function CardLoader() {
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  return (
    <Progress>
      <ThemeProvider theme={theme}>
        <CircularProgress />
      </ThemeProvider>
    </Progress>
  );
}
