import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeContext } from "styled-components";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";

import { Container, Progress } from "./styles";

const startDate = moment().subtract(12, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function DailyConfirmedCases() {
  const cardId = "dash-covid-19";
  const cardTitle = "Casos diários confirmados";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
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
        chartData = [];

      results.map((result) => {
        chartLabels.push(`${result.day} ${result.month_name}-${result.total}`);
        chartData.push(result.positive);
      });

      setLabels(chartLabels);
      setData(chartData);
      setLabelsExcel(chartLabels);
      setDataExcel([chartData]);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  return (
    <Container>
      {!isDataLoaded && (
        <Progress>
          <CircularProgress />
        </Progress>
      )}
      <Card
        cardId={cardId}
        cardTitle={cardTitle}
        cardLabel={
          dates[0] !== startDate || dates[1] !== endDate
            ? `De ${dates[0]} à ${dates[1]}`
            : "Últimos 12 meses"
        }
        excelData={dataExcel}
        excelLabels={labelsExcel}
        chartData={{
          label: "Casos Positivos",
          color: colors.primary,
          data: data,
        }}
        chartLabels={labels}
        menuType="national"
        height="400px"
        handleParams={handleGetParams}
      />
    </Container>
  );
}
