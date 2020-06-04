import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";

import { Container, Progress } from "./styles";

const startDate = moment().subtract(84, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TAT() {
  const cardId = "tat-by-month";
  const cardTitle = "Tempo de Resposta as amostras";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/covid19tat", {
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
      var chartLabels = [],
        collection_registration = [],
        registration_analysis = [],
        analysis_validation = [];

      results.map((result) => {
        chartLabels.push(result.month_name + "-" + result.week);
        collection_registration.push(result.collection_registration);
        registration_analysis.push(result.registration_analysis);
        analysis_validation.push(result.analysis_authorization);
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Colheita à Recepção",
          backgroundColor: "#fb8c00",
          data: collection_registration,
        },
        {
          label: "Recepção ao Registo",
          backgroundColor: "#ef5350",
          data: registration_analysis,
        },
        {
          label: "Registo à Análise",
          backgroundColor: "#00000",
          data: analysis_validation,
        },
      ]);
      setLabelsExcel(chartLabels);
      setDataExcel([
        collection_registration,
        registration_analysis,
        analysis_validation,
      ]);
    }
    loadData();
  }, [labs, dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  return (
    <Container>
      {!isDataLoaded && (
        <Progress>
          <CircularProgress color="green" />
        </Progress>
      )}
      <Card
        cardId={cardId}
        cardTitle={cardTitle}
        cardLabel={
          dates[0] === startDate && dates[1] === endDate
            ? "Últimas 12 semanas"
            : `De ${dates[0]} à ${dates[1]}`
        }
        excelData={dataExcel}
        excelLabels={labelsExcel}
        chartData={data}
        chartLabels={labels}
        menuType="national"
        handleParams={handleGetParams}
      />
    </Container>
  );
}
