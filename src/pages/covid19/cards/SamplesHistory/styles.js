import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexRoRgba from "hex-to-rgba";

export const Container = styled.div`
  position: relative;
  padding: 0;
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
