import React, { useState, useContext } from "react";
import { ThemeContext } from "styled-components";

import {
  ThemeProvider,
  Button,
  Popover,
  Menu,
  MenuItem
} from "@material-ui/core";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";

import DatePicker from "../DatePicker";
import Btn from "../Btn";

import { Container, DateRangePanel, UseStyles } from "./styles";

export default function DateRange() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const [startDate, setStartDate] = useState(new Date("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(new Date("2014-08-18T21:11:54"));

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateStart = date => {
    setStartDate(date);
  };

  const handleDateEnd = date => {
    setEndDate(date);
  };

  function handleOnSubmit(event) {
    console.log({ start: startDate, end: endDate });
    event.preventDefault();
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        disableElevation
        className={classes.buttonDateRangePicker}
      >
        <IoIosArrowDown size={18} /> 21 Janeiro - 30 Julho
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <DateRangePanel>
          <form onSubmit={handleOnSubmit}>
            <DatePicker handleDateRange={handleDateStart} />
            <DatePicker handleDateRange={handleDateEnd} />
            <Btn label="Aplicar" type="submit" />
          </form>
        </DateRangePanel>
      </Popover>
    </Container>
  );
}
