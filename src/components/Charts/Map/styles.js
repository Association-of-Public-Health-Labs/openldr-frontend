import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MapSvg = styled.svg`
  height: 450px;
  width: 300px;
  margin-top: -20px;
  title {
    font-weight: bold;
  }
  path {
    stroke: ${props => props.theme.colors.mapStroke};
    stroke-width: 2;
    fill: ${props => props.theme.colors.mapFill};
    cursor: pointer;
    &:hover {
      fill: ${props => props.theme.colors.mapHover};
      transition-delay: 0.3s;
    }
  }
  text {
    font-size: 20px;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    fill: ${props => props.theme.colors.text};
  }
  .vl_sup_text {
    font-size: 18px;
    font-family: "Open Sans", sans-serif;
    font-weight: normal;
    fill: #00b000;
  }
  @media (min-width: 959px) and (max-width: 1120px) {
    height: 396px;
    width: 264px;
  }
`;

export const AverageText = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  h5 {
    text-transform: uppercase;
    color: ${props => hexToRgba(props.theme.colors.text, "0.4")};
  }
  h1 {
    font-size: 26px;
    font-weight: 100;
    color: ${props => props.theme.colors.text};
    margin-left: 10px;
  }
`;

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
