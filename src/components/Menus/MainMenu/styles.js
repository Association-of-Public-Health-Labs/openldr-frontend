import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @media (min-width: 600px) {
    position: ${(props) => (props.full ? "relative" : "absolute")};
    position: ${(props) =>
      props.full ? "relative" : props.fixed ? "fixed" : "absolute"};
  }
  @media (max-width: 599px) {
    position: fixed;
    border-radius: 0;
  }
`;

export const Menu = styled.form`
width: 86%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.full
      ? "none"
      : "0 0 0 1px rgba(99, 114, 130, 0.16), 0 8px 16px rgba(27, 39, 51, 0.08)"};
  padding: 0px;
  @media (min-width: 600px) {
    /* max-height: ${(props) => (props.full ? "100%" : "auto")};
    max-width: ${(props) =>
      props.full ? "100%" : props.fixed ? "60%" : "95%"};
    height: ${(props) => (props.full ? "100%" : "auto")};
    width: ${(props) => (props.full ? "100%" : props.fixed ? "60%" : "80%")}; */
  }
  @media (max-width: 599px) {
    /* max-height: 94%;
    max-width: 94%;
    height: auto;
    width: 90%; */
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Order = styled.h1`
  font-size: 50px;
  line-height: 50px;
  padding: 0;
  margin-right: 6px;
  color: ${(props) => hexToRgba(props.theme.colors.text, "0.3")};
`;

export const Description = styled.div`
  padding-top: 5px;
  p {
    font-size: 13px;
  }
`;

export const ColumnTitle = styled.h5`
  margin-bottom: 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text};
`;

export const Theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#00b000",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    normal: {
      main: "#333333",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    PrivateSwitchBase: {
      "input-226": {
        backgroundColor: "#00b000",
      },
    },
  },
});
