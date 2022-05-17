import React from "react";
import Grid from "@material-ui/core/Grid";

import { Container, MainPanel, Content } from "../styles";
import SideBar from "../../components/Menus/SideBar";
import Header from "../../components/Menus/MenuHeader";

import { viralload } from "../../utils/menuConfig";

import VlTestReasons from "../../cards/Labs/VLTestReasons";
import SamplesTestedMonthly from "../../cards/Labs/SamplesTestedMonthly";
import SamplesTestedByGender from "../../cards/Labs/SamplesTestedByGender";
import SamplesTestedByGenderAndLab from "../../cards/Labs/SamplesTestedByGenderAndLab";
import SamplesTestedByLab from "../../cards/Labs/SamplesTestedByLab";
import TATMonthly from "../../cards/Labs/TATMonthly";
import TatByLab from "../../cards/Labs/TATbyLab";
import SamplesTestedByAge from "../../cards/Labs/SamplesTestedByAge";
import Pregnant from "../../cards/Labs/SamplesTestedByPregnancy";
import Breastfeeding from "../../cards/Labs/SamplesTestedBreastfeeding";
import SamplesRejected from "../../cards/Labs/SamplesRejected"
import SamplesRejectedByMonth from "../../cards/Labs/SamplesRejectedByMonth";
import SamplesBackloggedByLab from "../../cards/Labs/SamplesBackloggedByLab";
import SamplesResumeByLab from "../../cards/Labs/SamplesResumeByLab";
import SamplesResume from "../../cards/Labs/SamplesResume";

export default function Lab() {
  return (
    <Container>
      <SideBar active="lab" menu={viralload} />
      <MainPanel>
        <Header page="Laboratório" id="lab" menu={viralload} />
        <Content>
          <Grid container spacing={3}>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesResumeByLab />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesResume />
            </Grid>
            {/* <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesBackloggedByLab /> 
            </Grid> */}
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByLab />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedMonthly />
            </Grid>
            {/* <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByGender />
            </Grid> */}
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <TatByLab />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <TATMonthly />
            </Grid>
            {/* <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByAge />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <Pregnant />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <Breastfeeding />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByGenderAndLab />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <VlTestReasons />
            </Grid> */}
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesRejected />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesRejectedByMonth />
            </Grid>
          </Grid>
        </Content>
      </MainPanel>
    </Container>
  );
}
