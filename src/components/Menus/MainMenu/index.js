import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Local from "../../MainMenuComponents/Local";
import Date from "../../MainMenuComponents/Date";
import Reports from "../../MainMenuComponents/Reports";
import Params from "../../MainMenuComponents/Params";
import Context from "../../../context";

import { Container, Menu, Theme } from "./styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  ExpansionPanel: {
    width: "100%",
    boxShadow: "none",
    borderRadius: 4,
    backgroundColor: "#f4f4f4",
  },
  ExpansionPanel2: {
    width: "100%",
    boxShadow: "none",
    border: "none",
    padding: 0,
  },
  details: {
    padding: 0,
  },
  Grid: {
    padding: 0,
  },
  radio: {
    "&$checked": {
      color: "#00b000",
    },
  },
  checked: {},
}));

export default function MainMenu() {
  const classes = useStyles();
  const [report, setReport] = useState(null);
  const [reportType, setReportType] = useState(null);
  const [parameters, setParameters] = useState(null);
  const [locations, setLocations] = useState(null);
  const [dates, setDates] = useState(null);
  const [step1Active, setStep1Active] = useState(true);
  const [step2Active, setStep2Active] = useState(false);
  const [step3Active, setStep3Active] = useState(false);
  const [step4Active, setStep4Active] = useState(false);

  const handleChangeMenu = (reportType, report) => {
    setReport(report);
    setReportType(reportType);
    // if (report && !parameters) {
    //   setStep2Active(true);
    //   setStep1Active(false);
    // }
  };

  const handleGetParams = (param) => {
    setParameters(param);
    console.log(param);
    if (report && param && !dates) {
      setStep3Active(true);
      setStep2Active(false);
    }
  };

  const handleGetLocal = (facilities) => {
    setLocations(facilities);
    console.log(facilities);
  };

  return (
    <Container>
      <Menu>
        <Grid alignItems="stretch" container spacing={0}>
          <Grid className={classes.Grid} item xs={3}>
            <Reports active={step1Active} handleChangeMenu={handleChangeMenu} />
          </Grid>
          <Grid className={classes.Grid} item xs={3}>
            <Params
              // active={step2Active}
              reportId={report}
              // handleGetParams={handleGetParams}
            />
          </Grid>
          <Grid className={classes.Grid} item xs={3}>
            <Local
              // active={step3Active}
              reportId={report}
              // params={parameters}
              handleGetLocal={handleGetLocal}
            />
          </Grid>
          <Grid className={classes.Grid} item xs={3}>
            <Date
              reportId={report}
              // params={parameters}
              facilities={locations}
            />
          </Grid>
        </Grid>
      </Menu>
    </Container>
  );
}
