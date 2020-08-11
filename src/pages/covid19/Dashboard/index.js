import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import { Container, MainPanel, Content } from "../../styles";
import { LeftGridPanel, Theme } from "./styles";
import { ThemeContext } from "styled-components";

import { covid19 } from "../../../utils/menuConfig";

import SideBar from "../../../components/Menus/SideBar";
import Header from "../../../components/Menus/MenuHeader";

import Map from "../cards/Map";
import Overview from "../cards/Overview";
import TAT from "../cards/TAT";
import SamplesHistory from "../cards/SamplesHistory";
import DailyConfirmedCases from "../cards/DailyConfirmedCases";
import PositiveByGender from "../cards/PositiveByGender";
import TestedPositives from "../cards/TestedPositives";
import NumTestsForeachPositive from "../cards/NumTestsForeachPositive";

function Dashboard() {
  return (
    <>
      <Container>
        <SideBar active="home" menu={covid19} />
        <MainPanel>
          <Header
            page="COVID19 Dashboard"
            id="home"
            menu={covid19}
            selectedDashboard="Carga Viral"
          />
          <Content>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <LeftGridPanel>
                  <Overview />
                  <TAT />
                </LeftGridPanel>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Map />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <DailyConfirmedCases />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <PositiveByGender />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <NumTestsForeachPositive />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TestedPositives />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <SamplesHistory />
              </Grid>
            </Grid>
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}

export default Dashboard;
