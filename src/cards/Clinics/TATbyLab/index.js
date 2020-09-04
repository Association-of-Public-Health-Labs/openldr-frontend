import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TATbyFacility() {
  const cardId = "tat-by-clinic";
  const cardTitle = "Tempo de Resposta";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [chartType, setChartType] = useState("province");
  const [disaggregation, setDisaggregation] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_tat_by_facility", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
          disaggregation: disaggregation,
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
        chartLabels.push(result.facility);
        collection_reception.push(result.collection_reception);
        reception_registration.push(result.reception_registration);
        registration_analysis.push(result.registration_analysis);
        analysis_validation.push(result.analysis_validation);
        setChartType(result.type);
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
  }, [facilities, dates]);

  const handleGetParams = (param) => {
    if (param.facilityType === "province") {
      setFacilities(param.provinces);
      setType(param.facilityType);
      setDisaggregation(false);
    } else if (param.facilityType === "district") {
      setFacilities(param.districts);
      setType(param.facilityType);
      setDisaggregation(false);
    } else if (param.facilityType === "clinic") {
      setFacilities(param.clinics);
      setType(param.facilityType);
      setDisaggregation(false);
    }
    setDates([param.startDate, param.endDate]);
    setIsLoading(true);
  };

  const handleChartClick = (value) => {
    setDisaggregation(true);
    if (chartType === "province") {
      setFacilities([value]);
      setDisaggregation(true);
      setType("district");
      setIsLoading(true);
    } else if (chartType === "district") {
      setFacilities([value]);
      setDisaggregation(true);
      setType("clinic");
      setIsLoading(true);
    } else if (chartType === "clinic") {
      // setFacilities([value]);
    }
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
      isLab={false}
      expandable={true}
      menuFixed={true}
      handleParams={handleGetParams}
      isLoading={isLoading}
    >
      <Bar datasets={data} labels={labels} onClick={handleChartClick} />
    </Card>
  );
}
