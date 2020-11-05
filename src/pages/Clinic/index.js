import React from "react";
import Grid from "@material-ui/core/Grid";

import { Container, MainPanel, Content } from "../styles";
import SideBar from "../../components/Menus/SideBar";
import Header from "../../components/Menus/MenuHeader";
import PatientsListPopup from "../../components/PatientsListPopup";

import { viralload } from "../../utils/menuConfig";

import MapSamples from "../../cards/Clinics/MapSamples";
import VlTestReasons from "../../cards/Clinics/VLTestReasons";
import SamplesTestedMonthly from "../../cards/Clinics/SamplesTestedMonthly";
import SamplesTestedByGenderMonthly from "../../cards/Clinics/SamplesTestedByGenderMonthly";
import SamplesTestedByGender from "../../cards/Clinics/SamplesTestedByGender";
import SamplesTestedByFacility from "../../cards/Clinics/SamplesTestedByLab";
import TATMonthly from "../../cards/Clinics/TATMonthly";
import TatByLab from "../../cards/Clinics/TATbyLab";
import SamplesTestedByAge from "../../cards/Clinics/SamplesTestedByAge";
import Pregnant from "../../cards/Clinics/SamplesTestedByPregnancy";
import Breastfeeding from "../../cards/Clinics/SamplesTestedBreastfeeding";
import SamplesRegisteredByFacility from "../../cards/Clinics/SamplesRegisteredByFacility";
import SamplesRejectedByMonth from "../../cards/Clinics/SamplesRejectedByMonth"
import SamplesRejectedByFacility from "../../cards/Clinics/SamplesRejectedByFacility"


export default function Clinic() {
  return (
    <>
    {/* <PatientsListPopup/> */}
    <Container>
      <SideBar active="clinic" menu={viralload} />
      <MainPanel>
        <Header page="Provincia/Distrito/US" id="clinic" menu={viralload} />
        <Content>
          <Grid container spacing={3}>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesRegisteredByFacility />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByFacility />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByGender />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByGenderMonthly />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <TATMonthly />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <TatByLab />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <SamplesTestedByAge />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <Pregnant />
            </Grid>
            <Grid item xs={6} xs={12} sm={12} md={6} lg={6}>
              <Breastfeeding />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <VlTestReasons />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SamplesRejectedByMonth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <SamplesRejectedByFacility />
            </Grid>
          </Grid>
        </Content>
      </MainPanel>
    </Container></>
  );
}
