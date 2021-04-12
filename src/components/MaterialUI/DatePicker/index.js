import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import moment from "moment";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Container, Theme } from "./styles";

export default function DatePicker({
  handleDateRange,
  label,
  defaultDate,
  minDate,
  type
}) {
  const { colors } = useContext(ThemeContext);
  const [date, setDate] = useState(defaultDate);

  const handleChange = (date) => {
    setDate(date);
    handleDateRange(moment(date).format("YYYY-MM-DD"));
  };

  const theme = Theme(colors);

  const useStyles = makeStyles((theme) => ({
    focused: {},
    outlinedInput: {
      "&$focused $notchedOutline": {
        border: `2px solid ${colors.primary}`,
      },
    },
    notchedOutline: {},
  }));
  const classes = useStyles();

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
            minDate={minDate}
            type={type}
            margin="none"
            inputProps={{
              style: { color: colors.text },
              classes: {
                root: classes.outlinedInput,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              style: { color: hexToRgba(colors.text, "0.5") },
            }}
            DialogProps={{
              style: { backgroundColor: colors.background.primary },
            }}
            style={{
              width: "100%",
              marginBottom: 15,
              backgroundColor: colors.background.textInput,
              borderRadius: 4,
            }}
            id="date-picker-start"
            label={label}
            autoOk
            value={date}
            onChange={handleChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Container>
  );
}
