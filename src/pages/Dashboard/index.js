import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import { Container, MainPanel, Content } from "../styles";
import { LeftGridPanel } from "./styles";

import SideBar from "../../components/Menus/SideBar";
import Header from "../../components/Menus/MenuHeader";
import SpeedActions from "../../components/MaterialUI/SpeedActions";
import MainMenu from "../../components/Menus/MainMenu";

import SamplesHistory from "../../cards/dashboard/SamplesHistory";
import ViralSuppMap from "../../cards/dashboard/ViralSuppMap";
import Overview from "../../cards/dashboard/Overview";
import TATvsDisa from "../../cards/dashboard/TATvsDisa";
import TAT from "../../cards/dashboard/TAT";
import ViralLoadSuppression from "../../cards/dashboard/VLSuppression";

export default function Dashboard() {
  return (
    <>
      {/* <MainMenu /> */}
      <Container>
        <SideBar active="home" />
        <MainPanel>
          <Header page="Dashboard" id="home" />
          <Content>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <LeftGridPanel>
                  <Overview />
                  <ViralLoadSuppression />
                </LeftGridPanel>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <ViralSuppMap />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <TAT />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TATvsDisa />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SamplesHistory />
              </Grid>
            </Grid>
            {/* <SpeedActions /> */}
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}
