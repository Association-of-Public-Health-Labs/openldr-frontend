import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div``;

export const Theme = colors => {
  return createMuiTheme({
    overrides: {
      MuiMenu: {
        paper: {
          backgroundColor: colors.background.secondary,
          color: colors.text
        }
      }
    }
  });
};
