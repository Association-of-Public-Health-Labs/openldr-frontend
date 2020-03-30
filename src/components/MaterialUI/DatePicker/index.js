import React, { useState, useContext } from "react";

import { ThemeProvider } from "@material-ui/core";
import { IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Container, Theme } from "./styles";

export default function DatePicker({ handleDateRange, label }) {
  const { colors } = useContext(ThemeContext);
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = date => {
    setDate(date);
    handleDateRange(date);
  };

  const theme = Theme(colors);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            size="small"
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            keyboardIcon={<IoIosArrowDown size={14} />}
            format="dd/MM/yyyy"
            margin="none"
            inputProps={{
              style: { color: colors.text }
            }}
            InputLabelProps={{
              style: { color: hexToRgba(colors.text, "0.5") }
            }}
            DialogProps={{
              style: { backgroundColor: colors.background.primary }
            }}
            style={{
              width: "100%",
              marginBottom: 15,
              backgroundColor: colors.background.textInput,
              borderRadius: 4
            }}
            id="date-picker-start"
            label={label}
            autoOk
            value={date}
            onChange={handleChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Container>
  );
}
