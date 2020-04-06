import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeContext } from "styled-components";
import qs from "qs";
import moment from "moment";
import average from "average";
import api from "../../../services/api";

import OverviewChart from "../../../components/Charts/OverviewChart";

import { Container, Card, ChartCanvas, CardText, useStyles } from "./styles";

export default function Overview() {
  const classes = useStyles();
  const { colors } = useContext(ThemeContext);

  const [numberOfSamples, setNumberOfSamples] = useState(0);
  const [samplesLabels, setSamplesLabels] = useState([]);
  const [samplesData, setSamplesData] = useState([]);
  const [suppLabels, setSuppLabels] = useState([]);
  const [suppData, setSuppData] = useState([]);
  const [tatLabels, setTatLabels] = useState([]);
  const [tatData, setTatData] = useState([]);
  const [dates, setDates] = useState([
    moment()
      .subtract(1, "year")
      .format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD")
  ]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_number_of_samples", {
        params: {
          dates: dates
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      const results = response.data;
      var labels = [],
        data = [];

      results.map(result => {
        labels.push(result.month);
        data.push(result.total);
        setNumberOfSamples(prevState => prevState + result.total);
      });
      setSamplesLabels(labels);
      setSamplesData(data);
    }
    loadData();
  }, [dates]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_viral_suppression", {
        params: {
          dates: dates
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      const results = response.data;
      var labels = [],
        data = [];

      results.map(result => {
        labels.push(result.month);
        const { suppressed, total } = result;
        if (total > 0) {
          data.push(Math.round((suppressed / total) * 100));
        } else {
          data.push(0);
        }
      });
      setSuppLabels(labels);
      setSuppData(data);
    }
    loadData();
  }, [dates]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_tat", {
        params: {
          dates: dates
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      const results = response.data;
      var labels = [],
        data = [];

      results.map(result => {
        labels.push(result.month);
        const {
          collection_reception,
          reception_registration,
          registration_analysis,
          analysis_validation
        } = result;
        data.push(
          collection_reception +
            reception_registration +
            registration_analysis +
            analysis_validation
        );
      });
      setTatLabels(labels);
      setTatData(data);
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
              <h5>Supressao Viral</h5>
              <h1>{Math.round(average(suppData))}%</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={suppLabels}
                dataset={suppData}
                color="#ef5350"
              />
            </ChartCanvas>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Tempo de Resposta</h5>
              <h1>{Math.round(average(tatData))} dias</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={tatLabels}
                dataset={tatData}
                color={colors.tertiary}
              />
            </ChartCanvas>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
