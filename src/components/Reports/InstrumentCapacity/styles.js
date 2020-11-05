import styled, { ThemeContext } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexRoRgba from "hex-to-rgba";

export const Container = styled.div`
  
`;

export const UseStyles = makeStyles({
    table: {
      backgroundColor: "transparent",
      borderColor: props => hexRoRgba(props.primary, "0.4"),
      borderWidth: 0.6,
      borderStyle: "solid"
    },
    tableContainer: {
      boxShadow: "0 0 0 0 rgba(255, 105, 135, 0)",
      borderRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      background: "transparent",
      borderTopColor: props => hexRoRgba(props.primary, "0.4"),
      borderTopWidth: 0.4
    },
    tableCell: {
      borderBottomColor: props => props.tableBorder,
      fontSize: "0.775rem",
      color: props => props.text
    },
    tableLastRow: {
      "&:last-child th, &:last-child td": {
        borderBottomColor: props => hexRoRgba(props.primary, "0.4"),
        borderBottomWidth: 0.6,
        borderBottomStyle: "solid"
      }
    },
    tableHeaderCell: {
      borderTopColor: props => hexRoRgba(props.primary, "0.4"),
      borderTopWidth: 1,
      borderBottomColor: props => hexRoRgba(props.primary, "0.4"),
      backgroundColor: props => hexRoRgba(props.primary, "0.07"),
      color: props => props.primary,
      fontWeight: "normal"
    },
    collapse: {
        backgroundColor: "#F9F9F9"
    }
  });