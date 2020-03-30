import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeContext } from "styled-components";

import OverviewChart from "../../../components/Charts/OverviewChart";

import { Container, Card, ChartCanvas, CardText, useStyles } from "./styles";

export default function Overview() {
  const classes = useStyles();
  const { colors } = useContext(ThemeContext);

  const labels = ["12pm", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
  const data = [40, 500, 650, 700, 1200, 1250, 1300, 1900];

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Number of Samples</h5>
              <h1>5690000</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={labels}
                dataset={data}
                color={colors.primary}
              />
            </ChartCanvas>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Viral Suppression</h5>
              <h1>72%</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart labels={labels} dataset={data} color="#ef5350" />
            </ChartCanvas>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card>
            <CardText>
              <h5>Turn around time</h5>
              <h1>21 days</h1>
            </CardText>
            <ChartCanvas>
              <OverviewChart
                labels={labels}
                dataset={data}
                color={colors.tertiary}
              />
            </ChartCanvas>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
