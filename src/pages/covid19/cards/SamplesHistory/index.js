import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { ThemeContext } from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";
import CardLoader from "../../../../components/CardLoader";

import { Container, Progress } from "./styles";

const startDate = moment().subtract(2, "day").format("YYYY-MM-DD");
const endDate = moment().subtract(1, "day").format("YYYY-MM-DD");

export default function Indicators() {
  const cardId = "dash-samples-history";
  const cardTitle = "Resumo de Indicadores";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [registeredSamples, setRegisteredSamples] = useState([]);
  const [testedSamples, setTestedSamples] = useState([]);
  const [rejectedSamples, setRejectedSamples] = useState([]);
  const [nonValidatedSamples, setNonValidatedSamples] = useState([]);
  const [suppressedSamples, setSuppressedSamples] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get(`/report`, {
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
      setIsDataLoaded(true);
      const results = response.data;
      var tableLabels = [
          "Provincia",
          "Amostras Recebidas",
          "Amostras Testadas",
          "Amostras Validadas",
          "Amostras Pendentes",
          "Amostras Rejeitadas",
          "Casos Positivos",
        ],
        registered = [],
        tested = [],
        non_validated = [],
        rejected = [],
        suppressed = [];

      var tableRows = [];

      results.map((result, index) => {
        tableRows[index] = [
          result.RequestingProvinceName,
          result.samples_receipt,
          result.samples_tested,
          result.samples_authorised,
          result.samples_pending,
          result.samples_rejected,
          result.samples_positive,
        ];
      });
      setLabels(tableLabels);
      setRegisteredSamples(registered);
      setTestedSamples(tested);
      setRejectedSamples(rejected);
      setNonValidatedSamples(non_validated);
      setSuppressedSamples(suppressed);
      setRows(tableRows);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  const header = labels;

  return (
    <Container>
      {!isDataLoaded && <CardLoader />}
      <Card
        cardId={cardId}
        cardTitle={cardTitle}
        cardLabel={
          dates[0] === startDate && dates[1] === endDate
            ? "Últimas 24 horas"
            : `De ${dates[0]} à ${dates[1]}`
        }
        excelData={rows}
        excelLabels={header}
        chartData={rows}
        chartLabels={header}
        menuType="national"
        borderRadius="4px"
        handleParams={handleGetParams}
      />
    </Container>
  );
}
