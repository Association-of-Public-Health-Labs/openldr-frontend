import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";
import CardLoader from "../../../../components/CardLoader";

import { Container } from "./styles";

const startDate = moment().subtract(15, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TatByLab() {
  const cardId = "covid-tat-by-lab";
  const cardTitle = "Tempo de Resposta das amostras por Lab";
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
      const response = await api.get("/covid19/lab_tat", {
        params: {
          codes: labs,
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
        collection_reception = [],
        reception_registration = [],
        registration_analysis = [],
        analysis_validation = [];

      results.map((result) => {
        chartLabels.push(result.TestingFacilityName);
        collection_reception.push(
          Math.round(result.collection_reception / 24).toFixed(1)
        );
        reception_registration.push(
          Math.round(result.reception_registration / 24).toFixed(1)
        );
        registration_analysis.push(
          Math.round(result.registration_analysis / 24).toFixed(1)
        );
        analysis_validation.push(
          Math.round(result.analysis_validation / 24).toFixed(1)
        );
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Colheita à Recepção",
          backgroundColor: "#fb8c00",
          data: collection_reception,
        },
        {
          label: "Recepção ao Registo",
          backgroundColor: "#ef5350",
          data: reception_registration,
        },
        {
          label: "Registo à Análise",
          backgroundColor: "#00000",
          data: registration_analysis,
        },
        {
          label: "Análise à Validação",
          backgroundColor: "#00b000",
          data: analysis_validation,
        },
      ]);
      setLabelsExcel(chartLabels);
      setDataExcel([
        collection_reception,
        reception_registration,
        registration_analysis,
        analysis_validation,
      ]);
    }
    loadData();
  }, [labs, dates]);

  const handleGetParams = (param) => {
    const laboratories = [];
    const labCodes = param.labs;
    if (labCodes && labCodes.length > 0) {
      labCodes.map((lab) => {
        laboratories.push(...lab);
      });
    }

    setLabs(laboratories);
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
          dates[0] === startDate && dates[1] === endDate
            ? "Últimos 15 dias"
            : `De ${dates[0]} à ${dates[1]}`
        }
        excelData={dataExcel}
        excelLabels={labelsExcel}
        chartData={data}
        chartLabels={labels}
        menuType="byFacility"
        isLab={true}
        handleParams={handleGetParams}
      />
    </Container>
  );
}
