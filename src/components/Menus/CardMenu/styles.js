import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div`
  position: absolute;
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
    position: absolute;
    border-radius: ${(props) => props.borderRadius};
  }
  @media (max-width: 599px) {
    position: fixed;
    border-radius: 0;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  max-width: 95%;
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  padding: 5px 20px 20px 20px;
`;

export const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuTitle = styled.h4`
  margin: 0;
`;

export const MenuCloseButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: none;
  border: none;
`;

export const UseStyles = makeStyles({
  datePicker: {
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "4px",
    borderBottomColor: "#ffffff",
  },
  margin: {
    margin: "10px",
    color: "white",
  },
  iconButton: {
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
});

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
});
