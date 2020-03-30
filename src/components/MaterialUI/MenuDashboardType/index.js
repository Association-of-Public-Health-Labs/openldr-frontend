import React, { useState, useContext } from "react";
import { ThemeContext } from "styled-components";

import {
  ThemeProvider,
  Button,
  Popover,
  Menu,
  MenuItem,
  IconButton
} from "@material-ui/core";

import { Container, UseStyles, Theme } from "./styles";

export default function MenuDashboardType() {
  const [dashboardType, setDashboardType] = useState(null);
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  const handleClickDashboardType = event => {
    setDashboardType(event.currentTarget);
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
          Viral Load
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={dashboardType}
          keepMounted
          open={Boolean(dashboardType)}
          onClose={handleCloseDashboardType}
        >
          <MenuItem onClick={handleCloseDashboardType}>Viral Load</MenuItem>
          <MenuItem onClick={handleCloseDashboardType} disabled>
            Early Infant Diagnosis
          </MenuItem>
          <MenuItem onClick={handleCloseDashboardType} disabled>
            Tuberculose
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </Container>
  );
}
