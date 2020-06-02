import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div`
  width: 100%;
  height: 540px;
  background-color: ${(props) => props.theme.colors.background.secondary};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: #ececec;
  border-width: 0.9;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
`;

export const MapSvg = styled.svg`
  title {
    font-weight: bold;
  }
  path {
    stroke: ${(props) => props.theme.colors.mapStroke};
    stroke-width: 2;
    fill: ${(props) => props.theme.colors.mapFill};
    cursor: pointer;
    &:hover {
      fill: ${(props) => props.theme.colors.mapHover};
      transition-delay: 0.3s;
    }
  }
  text {
    font-size: 20px;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    fill: ${(props) => props.theme.colors.text};
  }
  .vl_sup_text {
    font-size: 18px;
    font-family: "Open Sans", sans-serif;
    font-weight: normal;
    fill: #00b000;
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
    color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
  }
  h1 {
    font-size: 26px;
    font-weight: 100;
    color: ${(props) => props.theme.colors.text};
    margin-left: 10px;
  }
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
  });

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CardMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button.card-menu-options {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.background.primary};
    border: none;
    margin-right: 5px;
    outline: none;
    color: ${(props) => props.theme.colors.text};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  button.active {
    background-color: #00b000;
    color: white;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: uppercase;
    color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
    margin-bottom: 5px;
  }
`;

export const MenuButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #efefef;
  border: none;
  margin-left: 5px;
  outline: none;
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
`;
