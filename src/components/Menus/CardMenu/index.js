import React, { useState } from "react";

import { ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FiX } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import DatePicker from "../../MaterialUI/DatePicker";
import IconBtn from "../../MaterialUI/IconBtn";
import Btn from "../../MaterialUI/Btn";

import {
  Container,
  Menu,
  MenuHeader,
  MenuTitle,
  UseStyles,
  Theme
} from "./styles";

export default function CardMenu({ handleCloseMenu, borderRadius }) {
  const classes = UseStyles();

  return (
    <Container borderRadius={borderRadius}>
      <Menu>
        <MenuHeader>
          <MenuTitle>Alterar o Intervalo</MenuTitle>
          <ThemeProvider theme={Theme}>
            <IconButton
              className={classes.iconButton}
              size="medium"
              aria-label="close"
              color="normal"
              onClick={() => handleCloseMenu(false)}
            >
              <FiX size={16} />
            </IconButton>
          </ThemeProvider>
        </MenuHeader>
        <DatePicker label="Inicio" />
        <DatePicker label="Fim" />
        <Btn label="Aplicar" />
      </Menu>
    </Container>
  );
}
