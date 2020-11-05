import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexToRgba from "hex-to-rgba"

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Popup = styled.div`
  width: 95%;
  height: 95%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 15px 30px 15px;
`

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: uppercase;
    color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
    margin-bottom: 5px;
    margin-right: 5px;
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
    borderTopColor: (props) => hexToRgba(props.primary, "0.4"),
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
    borderTopColor: (props) => hexToRgba(props.primary, "0.4"),
    borderTopWidth: 1,
    borderBottomColor: (props) => hexToRgba(props.primary, "0.4"),
    backgroundColor: (props) => hexToRgba(props.primary, "0.02"),
    color: (props) => props.primary,
    fontWeight: "normal",
  },
});