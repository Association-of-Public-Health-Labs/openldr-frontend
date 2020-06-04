import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexRoRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
  border-top: 0.4px solid #00b000;
  padding: 0;
`;

export const UseStyles = makeStyles({
  table: {
    backgroundColor: (props) => props.background.secondary,
  },
  tableContainer: {
    boxShadow: "0 0 0 0 rgba(255, 105, 135, 0)",
    borderRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    background: "transparent",
    borderTopColor: (props) => hexRoRgba(props.primary, "0.4"),
    borderTopWidth: 0.4,
  },
  tableCell: {
    borderBottomColor: (props) => props.tableBorder,
    fontSize: "0.775rem",
    color: (props) => props.text,
  },
  tableLastRow: {
    "&:last-child th, &:last-child td": {
      borderBottomColor: "transparent",
    },
  },
  tableHeaderCell: {
    borderTopColor: (props) => hexRoRgba(props.primary, "0.4"),
    borderTopWidth: 1,
    borderBottomColor: (props) => hexRoRgba(props.primary, "0.4"),
    backgroundColor: (props) => hexRoRgba(props.primary, "0.02"),
    color: (props) => props.primary,
    fontWeight: "normal",
  },
});

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
      MuiInput: {
        underline: {
          "&:after": {
            borderBottomColor: "transparent",
          },
          "&:before": {
            borderBottomColor: "transparent",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "transparent",
          },
          "&:active": {
            borderBottomColor: "transparent",
          },
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: "transparent",
        },
      },
      MuiTablePagination: {
        select: {
          color: theme.text,
        },
        selectIcon: {
          color: theme.text,
        },
      },
      MuiTypography: {
        caption: {
          color: theme.text,
        },
      },
      MuiIcon: {
        root: {
          color: theme.text,
        },
      },
    },
  });
