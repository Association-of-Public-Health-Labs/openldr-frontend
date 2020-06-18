import React, { useState, useContext } from "react";
import { ThemeContext } from "styled-components";

import {
  ThemeProvider,
  Button,
  Popover,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import { Container, UseStyles, Theme, MenuLink } from "./styles";

export default function MenuDashboardType({ history, selectedDashboard }) {
  const [dashboardType, setDashboardType] = useState(null);
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  const handleClickDashboardType = (event) => {
    setDashboardType(event.currentTarget);
    // history.push(`/dashboard`);
  };

  const handleCloseDashboardType = () => {
    setDashboardType(null);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickDashboardType}
          className={classes.buttonDashboardType}
        >
          Ver outra Dashboard
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={dashboardType}
          keepMounted
          open={Boolean(dashboardType)}
          onClose={handleCloseDashboardType}
        >
          <MenuItem
            style={{ padding: 0 }}
            onClick={() => handleCloseDashboardType("dashboard")}
          >
            <MenuLink href="/dashboard">Carga Viral de HIV</MenuLink>
          </MenuItem>
          <MenuItem
            style={{ padding: 0 }}
            onClick={() => handleCloseDashboardType("covid19")}
          >
            <MenuLink href="/covid19">Covid-19 (SARS Cov - 2)</MenuLink>
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </Container>
  );
}
