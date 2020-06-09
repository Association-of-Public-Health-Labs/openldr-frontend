import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TATMonthly() {
  const cardId = "tat-by-month";
  const cardTitle = "Tempo de Resposta por mês";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_tat_by_month", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      var chartLabels = [],
        collection_reception = [],
        reception_registration = [],
        registration_analysis = [],
        analysis_validation = [];

      results.map((result) => {
        chartLabels.push(result.month_name.substring(0, 3));
        collection_reception.push(result.collection_reception);
        reception_registration.push(result.reception_registration);
        registration_analysis.push(result.registration_analysis);
        analysis_validation.push(result.analysis_validation);
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
    setLabs(param.labs);
    setDates([param.startDate, param.endDate]);
  };

  return (
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
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
      handleParams={handleGetParams}
    />
  );
}
