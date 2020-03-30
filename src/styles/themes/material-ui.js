import { createMuiTheme } from "@material-ui/core";

export const materialUI = async theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: await theme.colors.primary
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00"
      },
      normal: {
        main: await theme.colors.primary
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  });
