import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeContext } from "styled-components";
import qs from "qs";
import moment from "moment";
import average from "average";
import api from "../../../../services/api";

import OverviewChart from "../../../../components/Charts/OverviewChart";

import { Container, Card, ChartCanvas, CardText, useStyles } from "./styles";

export default function Overview() {
  const classes = useStyles();
  const { colors } = useContext(ThemeContext);

  const [numberOfSamples, setNumberOfSamples] = useState(0);
  const [samplesLabels, setSamplesLabels] = useState([]);
  const [samplesData, setSamplesData] = useState([]);
  const [testedLabels, setTestedLabels] = useState([]);
  const [testedData, setTestedData] = useState([]);
  const [totalTested, setTotalTested] = useState(null);
  const [positivityLabels, setPositivityLabels] = useState([]);
  const [positivityData, setPositivityData] = useState([]);
  const [dates, setDates] = useState([
    moment().subtract(15, "day").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/numberofsamples", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const results = response.data;
      var labels = [],
        data = [];

      results.map((result) => {
        labels.push(result.month);
        data.push(result.total);
        setNumberOfSamples((prevState) => prevState + result.total);
      });
      setSamplesLabels(labels);
      setSamplesData(data);
    }
    loadData();
  }, [dates]);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/testedsamples", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const results = response.data;
      var labels = [],
        data = [],
        positive = [];

      results.map((result) => {
        labels.push(result.month);
        data.push(result.total);
        positive.push(result.positive);
        setTotalTested((prevState) => prevState + result.total);
      });
      setTestedLabels(labels);
      setTestedData(data);
      setPositivityData(positive);
    }
    loadData();
  }, [dates]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Numero de amostras</h5>
              <h1>{numberOfSamples}</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={samplesLabels}
                dataset={samplesData}
                color={colors.primary}
              />
            </ChartCanvas>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Amostras Testadas</h5>
              <h1>{totalTested}</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={testedLabels}
                dataset={testedData}
                color="#ef5350"
              />
            </ChartCanvas>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Casos Positivos</h5>
              <h1>{positivityData[positivityData.length - 1]}</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={testedLabels}
                dataset={positivityData}
                color={colors.tertiary}
              />
            </ChartCanvas>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
