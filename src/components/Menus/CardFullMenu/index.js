import React, { useState, useContext, useEffect } from "react";

import { ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { FiX } from "react-icons/fi";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ThemeContext } from "styled-components";

import ContextProvider from "../../../context";

import DatePicker from "../../MaterialUI/DatePicker";
import IconBtn from "../../MaterialUI/IconBtn";
import AgeRange from "../../MaterialUI/AgeRange";
import SelectSamples from "../../MaterialUI/SelectSamples";

import FacilitiesSelect from "../../FacilitiesSelect";

import {
  Container,
  Menu,
  MenuHeader,
  MenuTitle,
  SelectInputArea,
  Label,
  FacilityOptions,
  Tab,
  UseStyles,
  Theme,
  SelectStyles
} from "./styles";

export default function CardFullMenu(props) {
  const classes = UseStyles();
  const { colors } = useContext(ThemeContext);
  const animatedComponents = makeAnimated();
  const [province, setProvince] = useState(true);
  const [district, setDistrict] = useState(false);
  const [clinic, setClinic] = useState(false);
  const [tab, setTab] = useState("province");

  const [provinces, setProvinces] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [clinics, setClinics] = useState(null);
  const [labs, setLabs] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(new Date("2020-08-18T21:11:54"));
  const [age, setAge] = useState({ start: 15, end: 49 });
  const [samplesType, setSamplesType] = useState(null);

  const handleChange = event => {
    setProvince(false);
    setDistrict(false);
    setClinic(false);
    if (event.target.value === "province") setProvince(true);
    if (event.target.value === "district") setDistrict(true);
    if (event.target.value === "clinic") setClinic(true);
  };

  function handleTab(e) {
    setTab(e.currentTarget.dataset.id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      provinces: provinces,
      districts: districts,
      clinics: clinics,
      labs: labs,
      age: age,
      startDate: startDate,
      endDate: endDate,
      samplesType: samplesType
    });
  }

  const handleStartDate = dateRange => {
    setStartDate(dateRange);
  };

  const handleEndDate = dateRange => {
    setEndDate(dateRange);
  };

  const handleGetAge = age => {
    setAge({ start: age.start, end: age.end });
  };

  return (
    <Container
      full={props.full || false}
      fixed={props.fixed || false}
      borderRadius={props.borderRadius}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <Menu
        full={props.full || false}
        fixed={props.fixed || false}
        onSubmit={handleSubmit}
      >
        <ThemeProvider theme={Theme}>
          <MenuHeader>
            <MenuTitle>
              {props.lab && <h4>Editar o relatorio</h4>}
              {!props.lab && (
                <FacilityOptions>
                  <span className="text-search-by">Pesquisar por: </span>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      className={classes.formControl}
                      // value={value}
                      onChange={handleChange}
                    >
                      <Tab status={province ? "active" : ""}>
                        <FormControlLabel
                          value="province"
                          control={<Radio color="primary" size="small" />}
                          label="Provincia"
                          checked={province}
                          onChange={(event, checked) => setProvince(checked)}
                          onClick={handleTab}
                          data-id="province"
                          className={classes.radioLabel}
                        />
                      </Tab>
                      <Tab status={district ? "active" : ""}>
                        <FormControlLabel
                          value="district"
                          control={<Radio color="primary" size="small" />}
                          label="Distrito"
                        />
                      </Tab>
                      <Tab status={clinic ? "active" : ""}>
                        <FormControlLabel
                          value="clinic"
                          control={<Radio color="primary" size="small" />}
                          label="US"
                        />
                      </Tab>
                    </RadioGroup>
                  </FormControl>
                </FacilityOptions>
              )}
            </MenuTitle>
            {!props.full && (
              <IconBtn
                event={() => props.handleCloseMenu(false)}
                icon={<FiX size={18} />}
                color="normal"
              />
            )}
          </MenuHeader>

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={props.full ? 12 : 7}
              md={props.full ? 12 : 7}
              lg={props.full ? 12 : 7}
            >
              <FacilitiesSelect
                isProvinceEnabled={province}
                isDistrictEnabled={district}
                isClinicEnabled={clinic}
                isLabEnabled={props.lab}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={props.full ? 12 : 5}
              md={props.full ? 12 : 5}
              lg={props.full ? 12 : 5}
            >
              {props.sampleType && <SelectSamples />}
              {props.age === true && (
                <AgeRange
                  start={age.start}
                  end={age.end}
                  handleGetAge={handleGetAge}
                />
              )}
              <DatePicker label="Inicio" handleDateRange={handleStartDate} />
              <DatePicker label="Fim" handleDateRange={handleEndDate} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                type="submit"
                // disabled
              >
                Aplicar
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Menu>
      {/* </form> */}
    </Container>
  );
}
