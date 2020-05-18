import { createMuiTheme } from "@material-ui/core";
import hexToRgba from "hex-to-rgba";

export const Theme = (colors) => {
  return createMuiTheme({
    overrides: {
      MuiSpeedDial: {
        fab: {
          backgroundColor: colors.primary,
          color: "white",
          "&:hover": {
            backgroundColor: colors.primary,
          },
        },
      },
    },
  });
};
