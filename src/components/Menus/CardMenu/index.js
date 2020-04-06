import React, { useState } from "react";
import moment from "moment";
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

export default function CardMenu({
  handleCloseMenu,
  borderRadius,
  handleGetParams
}) {
  const classes = UseStyles();
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, "year")
      .format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const handleChangeStartDate = date => {
    setStartDate(date);
  };

  const handleChangeEndDate = date => {
    setEndDate(date);
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleGetParams({ startDate: startDate, endDate: endDate });
    handleCloseMenu(false);
  }

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
        <DatePicker
          handleDateRange={handleChangeStartDate}
          label="Inicio"
          defaultDate={moment().subtract(1, "year")}
        />
        <DatePicker
          handleDateRange={handleChangeEndDate}
          label="Fim"
          defaultDate={moment()}
        />
        <Btn label="Aplicar" onclick={handleSubmit} />
      </Menu>
    </Container>
  );
}
