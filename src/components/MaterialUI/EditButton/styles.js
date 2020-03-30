import { createMuiTheme } from "@material-ui/core";

export const Theme = theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: theme.primary
      },
      normal: {
        main: theme.primary
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  });
