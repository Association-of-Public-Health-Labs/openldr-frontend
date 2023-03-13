import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

import exportToExcel from "../../../utils/exportToExcel";
import excelConfig from "../../../config/excel";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesRegisteredByFacility() {
  const cardId = "samples-registered-by-facility";
  const cardTitle = "Amostras Registadas por Provincia";
  let history = useHistory()
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
    async function defaultLoadData() {
      const response = await api.get("/clinic_registered_samples_by_facility", {
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
        registered_samples = [];

      results.map((result) => {
        chartLabels.push(result.facility);
        registered_samples.push(result.total);
        setChartType(result.type);
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Amostras Registadas",
          backgroundColor: "#ef5350",
          data: registered_samples,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([["Amostras Registadas", ...registered_samples]]);
    }
    defaultLoadData();
  }, [dates, disaggregation, facilities, type]);

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

  const handleChartClick = async (value) => {
    setIsLoading(true)
    if (chartType === "clinic") {
      await exportRawData(value)
      setIsLoading(false)
      return
    }
    const response = await api.get("/clinic_registered_samples_by_facility", {
      params: {
        codes: [value],
        dates: dates,
        type: chartType,
        disaggregation: true,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    const results = response.data;
    setChartData(results);
    setChartType(chartType => chartType === "district" ? "district" : (chartType === "clinic" ? "clinic" : "province"))
    setIsLoading(false)
  };

  async function exportRawData (healthFacility) {
    const jwt_token = localStorage.getItem("@RAuth:token");
    if(!jwt_token) {history.push("/login")}
    const query = `RegisteredDatetime >= '${dates[0]}' AND RegisteredDatetime <= '${dates[1]}' AND RequestingFacilityName='${healthFacility}'`
    const response = await api.get("/viralload/all_patients/query/" + query, {
      headers: {
          authorization: `Bearer ${jwt_token}`,
      },
    });
    if(response.status === 401){history.push("/login")}
    await exportToExcel(healthFacility, healthFacility, excelConfig?.headers, response.data);
    setIsLoading(false)
  }

  function setChartData(results) {
    var chartLabels = [],
        registered_samples = [];

    results.map((result) => {
      chartLabels.push(result.facility);
      registered_samples.push(result.total);
      setChartType(result.type);
    });
    setLabels(chartLabels);
    setData([
      {
        label: "Amostras Registadas",
        backgroundColor: "#ef5350",
        data: registered_samples,
      },
    ]);
    setLabelsExcel(["", ...chartLabels]);
    setDataExcel([["Amostras Registadas", ...registered_samples]]);
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
