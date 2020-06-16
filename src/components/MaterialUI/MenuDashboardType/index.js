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

import { Container, UseStyles, Theme } from "./styles";

export default function MenuDashboardType({ selectedDashboard }) {
  const [dashboardType, setDashboardType] = useState(null);
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  const handleClickDashboardType = (event) => {
    setDashboardType(event.currentTarget);
    // history.push(`/${event}`);
  };

  const handleCloseDashboardType = (type) => {
    setDashboardType(type);
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
          {selectedDashboard}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={dashboardType}
          keepMounted
          open={Boolean(dashboardType)}
          onClose={handleCloseDashboardType}
        >
          <MenuItem onClick={() => handleCloseDashboardType("dashboard")}>
            Carga Viral
          </MenuItem>
          <MenuItem onClick={() => handleCloseDashboardType("covid19")}>
            Covid-19 (SARS Cov - 2)
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </Container>
  );
}
