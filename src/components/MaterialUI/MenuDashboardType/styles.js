import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";

export const UseStyles = makeStyles({
  buttonDashboardType: {
    marginLeft: 20,
    color: (colors) => colors.text,
  },
});

export const Container = styled.div``;

export const MenuLink = styled.a`
  padding: 10px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
`;

export const Theme = (colors) => {
  return createMuiTheme({
    overrides: {
      MuiMenu: {
        paper: {
          backgroundColor: colors.background.secondary,
          color: colors.text,
        },
      },
    },
  });
};
