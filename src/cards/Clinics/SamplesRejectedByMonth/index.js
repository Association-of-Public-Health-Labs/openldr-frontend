import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Chart from "../../../components/Charts/ChartBarStacked";

import exportToExcel from "../../../utils/exportToExcel";
import excelConfig from "../../../config/excel";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesRejectedByMonth() {
  const cardId = "clinic-samples-rejected-by-month";
  const cardTitle = "Amostras Rejeitadas por Provincia/mês";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_samples_rejected_by_month", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      setIsLoading(false);
      var chartLabels = [],
          rejected    = [];
      results.map((result) => {
        chartLabels.push(result.month_name.substring(0, 3));
        rejected.push(result.rejected);
      });
      setLabels(chartLabels);
      setData([
        {
          label: "Amostras Rejeitadas",
          backgroundColor: "#ef5350",
          data: rejected,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Amostras Rejeitadas", ...rejected],
      ]);
    }
    loadData();
  }, [facilities, dates, type]);

  const handleGetParams = (param) => {
    if (param.facilityType === "province") {
      setFacilities(param.provinces);
      setType(param.facilityType);
    } else if (param.facilityType === "district") {
      setFacilities(param.districts);
      setType(param.facilityType);
    } else if (param.facilityType === "clinic") {
      setFacilities(param.clinics);
      setType(param.facilityType);
    }
    setDates([param.startDate, param.endDate]);
    setIsLoading(true);
  };

  const handleChartClick = async () => {
    // const query = `RegisteredDatetime >= '${dates[0]}' AND RegisteredDatetime <= '${dates[1]}' AND RequestingFacilityName='${value}'`
    // const response = await api.get("/viralload/all_patients/query/" + query);
    // await exportToExcel(value, value, excelConfig?.headers, response.data);
  }

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      cardLabel={
        dates[0] !== startDate || dates[1] !== endDate
          ? `De ${dates[0]} à ${dates[1]}`
          : "Últimos 12 meses"
      }
      cardMenu={{ sampleType: true }}
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
      footerFacilitiesList={facilities}
    >
      <Chart dataChart={data} labels={labels} onClick={handleChartClick} />
    </Card>
  );
}
