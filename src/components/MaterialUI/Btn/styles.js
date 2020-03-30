import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

export const UseStyles = makeStyles({
  datePicker: {
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "4px",
    borderBottomColor: "#ffffff"
  },
  margin: {
    margin: "10px",
    color: "white"
  },
  iconButton: {
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center"
  }
});

export const Theme = colors => {
  return createMuiTheme({
    palette: {
      primary: {
        main: colors.primary
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00"
      },
      normal: {
        main: "#333333"
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  });
};
