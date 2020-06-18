import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  position: relative;
  padding: 0;
  margin-bottom: 20px;
`;

export const Progress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    hexToRgba(props.theme.colors.background.secondary, "0.8")};
  border-radius: 20px;
`;

export const Theme = (colors) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
      normal: {
        main: "#333333",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });
};
