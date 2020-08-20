import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";
import CardLoader from "../../../../components/CardLoader";

import { Container } from "./styles";

const startDate = moment().subtract(15, "day").format("YYYY-MM-DD");
const endDate = moment().subtract(1, "day").format("YYYY-MM-DD");

export default function SamplesByLab() {
  const cardId = "covid19-samples-by-lab";
  const cardTitle = "Amostras por Laboratorio";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [tested, setTested] = useState([]);
  const [authorised, setAuthorised] = useState([]);
  const [positives, setPositives] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/covid19/samples_by_lab/", {
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

      var arrLabels = [],
        arrTested = [],
        arrAuthorised = [],
        arrPositives = [];

      results.map((result) => {
        arrLabels.push(result.TestingFacilityName);
        arrTested.push(result.tested);
        arrAuthorised.push(result.authorised);
        arrPositives.push(result.positives);
      });

      setLabels(arrLabels);
      setTested(arrTested);
      setAuthorised(arrAuthorised);
      setPositives(arrPositives);
      setData([
        {
          label: "Amostras Testadas",
          backgroundColor: "#00b000",
          stack: "Stack 0",
          data: arrTested,
        },
        {
          label: "Amostras Validadas",
          backgroundColor: "#e74c3c",
          stack: "Stack 1",
          data: arrAuthorised,
        },
        {
          label: "Amostras Positivas",
          backgroundColor: hexToRgba("#e74c3c", "0.4"),
          stack: "Stack 1",
          data: arrPositives,
        },
      ]);
      setLabelsExcel(arrLabels);
      setDataExcel([arrTested, arrAuthorised, arrPositives]);
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
            : "Últimas 24 horas"
        }
        excelData={dataExcel}
        excelLabels={labelsExcel}
        chartData={data}
        chartLabels={labels}
      />
    </Container>
  );
}
