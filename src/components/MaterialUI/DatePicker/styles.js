import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
`;

export const Theme = colors => {
  return createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: colors.primary
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#ffcc00"
      },
      normal: {
        main: "#333333"
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    },
    overrides: {
      MuiPickersBasePicker: {
        container: {
          backgroundColor: colors.background.textInput,
          color: colors.text
        }
      },
      MuiPickersDay: {
        day: {
          color: colors.text
        },
        daySelected: {
          color: "white"
        }
      },
      MuiPickersCalendarHeader: {
        iconButton: {
          backgroundColor: colors.background.textInput,
          color: colors.text
        },
        dayLabel: {
          color: hexToRgba(colors.text, "0.5")
        }
      }
    }
  });
};
