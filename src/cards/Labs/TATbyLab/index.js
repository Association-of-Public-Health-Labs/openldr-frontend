import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TATMonthly() {
  const cardId = "tat-by-lab";
  const cardTitle = "Tempo de Resposta por Lab";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_tat", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      setIsLoading(false);
      var chartLabels = [],
        collection_reception = [],
        reception_registration = [],
        registration_analysis = [],
        analysis_validation = [];

      results.map((result) => {
        chartLabels.push(result.lab);
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
      setLabelsExcel(["Tempo Resposta", ...chartLabels]);
      setDataExcel([
        ["Colheita à Recepção", ...collection_reception],
        ["Recepção ao Registo", ...reception_registration],
        ["Registo à Analise", ...registration_analysis],
        ["Analise à Validação", ...analysis_validation],
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
    setIsLoading(true);
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
      isLoading={isLoading}
    >
      <Bar datasets={data} labels={labels} onClick={null} />
    </Card>
  );
}
