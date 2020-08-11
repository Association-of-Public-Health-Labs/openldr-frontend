import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeContext } from "styled-components";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";
import CardLoader from "../../../../components/CardLoader";

import { Container } from "./styles";

const startDate = moment().subtract(30, "day").format("YYYY-MM-DD");
const endDate = moment().subtract(1, "day").format("YYYY-MM-DD");

export default function TestedPositives() {
  const cardId = "dash-covid19-tested-positives";
  const cardTitle = "Amostras Testadas e Amostras Positivas";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [totals, setTotals] = useState([]);
  const [positives, setPositives] = useState([]);
  const [dailyPositives, setDailyPositives] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
      setIsDataLoaded(true);
      var chartLabels = [],
        chartPositives = [],
        chartTotals = [],
        chartDailyPositives = [];
      var cumulativePos = 0;
      var cumulative = 0;

      results.map((result) => {
        chartLabels.push(`${result.day}/${result.month_name}`);
        chartPositives.push(result.positive);
        chartTotals.push(result.total);
        chartDailyPositives.push(result.positive);
        cumulative += result.total;
        cumulativePos += result.positive;
      });

      setLabels(chartLabels);
      setTotals(chartTotals);
      setPositives(chartPositives);
      setDailyPositives(chartDailyPositives);
      setLabelsExcel(chartLabels);
      setDataExcel([chartPositives]);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  return (
    <Container>
      {!isDataLoaded && <CardLoader />}
      <Card
        cardId={cardId}
        cardTitle={cardTitle}
        cardLabel={
          dates[0] !== startDate || dates[1] !== endDate
            ? `De ${dates[0]} à ${dates[1]}`
            : "Últimos 15 dias"
        }
        excelData={dataExcel}
        excelLabels={labelsExcel}
        chartData={{
          tested: {
            label: "Casos Testados",
            color: "#00b000",
            data: totals,
          },
          positives: {
            label: "Casos Positivos",
            color: "#00b000",
            data: positives,
          },
          dailyPositives: {
            label: "Casos Diarios Positivos",
            color: "#111111",
            data: dailyPositives,
          },
        }}
        chartLabels={labels}
        menuType="national"
        height="400px"
        handleParams={handleGetParams}
      />
    </Container>
  );
}
