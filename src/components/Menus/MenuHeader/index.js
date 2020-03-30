import React, { useState, useContext, useEffect } from "react";

// import Button from "@material-ui/core/Button";
// import Popover from "@material-ui/core/Popover";
import {
  ThemeProvider,
  Button,
  Popover,
  Menu,
  MenuItem,
  IconButton
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { ThemeContext } from "styled-components";
import SearchBar from "material-ui-search-bar";
import Context from "../../../context";

import DateRange from "../../MaterialUI/DateRange";
import MobileMenu from "../../MaterialUI/MobileMenu";
import MenuDashboard from "../../MaterialUI/MenuDashboardType";
import ReportsBadge from "../../MaterialUI/ReportsBadge";

import {
  Container,
  Title,
  Search,
  Theme,
  UseStyles,
  Panel,
  LeftPanel
} from "./styles";

export default function MenuHeader(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { colors } = useContext(ThemeContext);
  const { reports } = useContext(Context);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  const [search, setSearch] = useState();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={7} lg={8}>
            <LeftPanel>
              <MobileMenu active={props.id} />
              <Title>{props.page}</Title>
              {/* <div>
                <SearchBar
                  onChange={value => setSearch(value)}
                  onRequestSearch={() => console.log("onRequestSearch")}
                  value={search}
                  style={{
                    margin: "0",
                    minWidth: 600
                  }}
                />
              </div> */}
            </LeftPanel>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Panel>
              <DateRange />
              <MenuDashboard />
              {reports.length > 0 && (
                <ReportsBadge totalReports={reports.length} />
              )}
            </Panel>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}
