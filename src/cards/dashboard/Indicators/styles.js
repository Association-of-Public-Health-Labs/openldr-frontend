import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexRoRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 4px;
  flex-direction: column;
  position: relative;
  padding-bottom: 10px;
`;

export const Header = styled.div`
  min-height: 50px;
  max-height: 80px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.6px solid rgba(0, 126, 0, 0.6);
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled.h3``;

export const CardMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button.withBackground {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: #efefef;
    border: none;
    margin-left: 5px;
    outline: none;
  }
  #line_chart {
    background-color: ${props => props.theme.colors.primary};
    color: white;
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
