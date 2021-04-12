import React, { useState, useContext, useEffect } from "react";

import { ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
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
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';

import ContextProvider from "../../../context";

import DatePicker from "../../MaterialUI/DatePicker";
import IconBtn from "../../MaterialUI/IconBtn";
import AgeRange from "../../MaterialUI/AgeRange";
import SelectSamples from "../../MaterialUI/SelectSamples";

import FacilitiesSelect from "../../FacilitiesSelect";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker as MuiDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns'; 

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CardFullMenu(props) {
  const classes = UseStyles();
  const { colors } = useContext(ThemeContext);
  const animatedComponents = makeAnimated();
  const [province, setProvince] = useState(true);
  const [district, setDistrict] = useState(false);
  const [clinic, setClinic] = useState(false);
  const [tab, setTab] = useState("province");
  const [facilities, setFacilities] = useState([]);

  const [provinces, setProvinces] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [clinics, setClinics] = useState(null);
  const [labs, setLabs] = useState(null);
  const [startDate, setStartDate] = useState(
    moment()
      .subtract(1, "year")
      .format("YYYY-MM-DD")
  );
  const [week, setWeek] = useState([])
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
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
    props.handleGetParams({
      provinces: handleFormatfacilitiesArrays(facilities.provinces),
      districts: handleFormatfacilitiesArrays(facilities.districts),
      clinics: handleFormatfacilitiesArrays(facilities.clinics),
      labs: handleFormatfacilitiesArrays(facilities.labs),
      facilityType: province
        ? "province"
        : district
        ? "district"
        : clinic && "clinic",
      age: age,
      startDate: startDate,
      endDate: endDate,
      samplesType: samplesType
    });
    props.handleCloseMenu(false);
  }

  const handleStartDate = dateRange => {
    setStartDate(dateRange);
  };

  const handleEndDate = dateRange => {
    setEndDate(dateRange);
  };

  const handleWeek = e => {
    const value = e.target.value;
    const arr = value.split("-");
    const year = parseInt(arr[0]);
    const week = parseInt(arr[1].replace("W",""));

    var sunday = new Date(year, 0, (1 + (week - 1) * 7));
    while (sunday.getDay() !== 0) {
        sunday.setDate(sunday.getDate() - 1);
    }

    setStartDate(moment(sunday).format('YYYY-MM-DD'));
    setEndDate(moment(sunday).add(6,"days").format('YYYY-MM-DD'));
    setWeek([
      moment(sunday).format('YYYY-MM-DD'),
      moment(sunday).add(6,"days").format('YYYY-MM-DD')
    ])
  }

  const handleGetAge = age => {
    setAge({ start: age.start, end: age.end });
  };

  const handleGetFacilities = facilities => {
    setFacilities(facilities);
  };

  function handleFormatfacilitiesArrays(facilities) {
    const result = [];
    facilities.map(facility => {
      result.push(facility.value);
    });
    return result;
  }

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
                handleGetFacilities={handleGetFacilities}
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
            {props?.dateType == 'week' ?
              <TextField
                id="date"
                label={week.length > 0 ? `${week[0]} à ${week[1]}` : "Selecione a semana"}
                type="week"
                defaultValue="2017-05-24"
                placeholder="Semana"
                variant="outlined"
                size="small"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleWeek}
              />
              : 
              <>
                <DatePicker
                  label="Inicio"
                  defaultDate={moment().subtract(1, "year")}
                  handleDateRange={handleStartDate}
                  minDate="2015-01-01"
                />
                <DatePicker
                  label="Fim"
                  defaultDate={moment()}
                  minDate={startDate}
                  handleDateRange={handleEndDate}
                />
              </>
            }
              
              
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
