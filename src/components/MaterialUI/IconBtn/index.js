import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { FiEdit2 } from "react-icons/fi";

import { Theme } from "./styles";

export default function IconBtn({ event, icon, color }) {
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        size="medium"
        aria-label="delete"
        color="default"
        onClick={event}
      >
        {icon}
      </IconButton>
    </ThemeProvider>
  );
}
