import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";

const startDate = moment().subtract(12, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function TestedVSPositive() {
  const cardId = "covid-19-positive-per-tested-cases";
  const cardTitle = "No. Positivos VS Casos Testados";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/testedsamples", {
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
      var chartLabels = [],
        chartPositive = [],
        chartTested = [];

      results.map((result) => {
        chartLabels.push(`${result.day} ${result.month_name}`);
        chartPositive.push(result.positive);
        chartTested.push(result.total);
      });

      setLabels(chartLabels);
      setData([chartPositive, chartTested]);
      setLabelsExcel(chartLabels);
      setDataExcel([chartPositive, chartTested]);
    }
    loadData();
  }, []);

  const handleGetParams = (param) => {
    // setDates([param.startDate, param.endDate]);
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
