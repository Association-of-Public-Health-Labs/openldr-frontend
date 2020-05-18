import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div`
  padding: 10px;
  height: 100%;
  border: ${(props) =>
    props.isActive && `2px solid ${props.theme.colors.primary}`};
  border-radius: 4px 0 0 4px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
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

export const Theme = (theme) =>
  createMuiTheme({
    palette: {
      primary: {
        main: theme.primary,
      },
      normal: {
        main: theme.primary,
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    overrides: {
      MuiTooltip: {
        tooltipArrow: {
          backgroundColor: "#00b000",
          color: "#00b000",
        },
      },
    },
  });
