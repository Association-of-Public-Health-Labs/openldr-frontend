import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import { Container, MainPanel, Content } from "../../styles";
import { LeftGridPanel } from "./styles";

import { covid19 } from "../../../utils/menuConfig";

import SideBar from "../../../components/Menus/SideBar";
import Header from "../../../components/Menus/MenuHeader";

import ViralSuppMap from "../../../cards/dashboard/ViralSuppMap";
import Overview from "../../../cards/dashboard/Overview";
import TATvsDisa from "../../../cards/dashboard/TATvsDisa";
import TAT from "../../../cards/dashboard/TAT";
import ViralLoadSuppression from "../../../cards/dashboard/VLSuppression";

function Dashboard() {
  return (
    <>
      <Container>
        <SideBar active="home" menu={covid19} />
        <MainPanel>
          <Header page="COVID19 Dashboard" id="home" menu={covid19} />
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
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}

export default Dashboard;
