import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

export default function TAT() {
  const cardId = "tat-by-month";
  const cardTitle = "Turn around time by month";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([
    moment().subtract(1, "year").format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD"),
  ]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_tat", {
        params: {
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
    setDates([param.startDate, param.endDate]);
  };

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="national"
      handleParams={handleGetParams}
    />
  );
}
