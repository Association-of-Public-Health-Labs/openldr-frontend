import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import groupBy from "json-groupby";
import qs from "qs";
import api from "../../../services/api";
import Card from "../../../components/MainCard";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function ViralSuppMap() {
  const cardId = "dash-viral-suppression-map";
  const cardTitle = "Taxa de Supressão Viral";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_map", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const results = response.data;
      setIsLoading(false);
      var chartLabels = [],
        mapData = [];

      results.map((result) => {
        chartLabels.push(result.province);
        const {
          suppressed,
          total,
          routine,
          treatment_failure,
          reason_not_specified,
        } = result;
        if (total === 0) {
          total = 1;
        }
        if (suppressed === 0) {
          suppressed = 1;
        }

        mapData[result.province] = {
          suppressed: Math.round((suppressed / total) * 100),
          routine: Math.round((routine / suppressed) * 100),
          treatment_failure: Math.round((treatment_failure / suppressed) * 100),
          reason_not_specified: Math.round(
            (reason_not_specified / suppressed) * 100
          ),
        };
      });
      setLabels(chartLabels);
      setData(results);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
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
      menuType="national"
      height="530px"
      handleParams={handleGetParams}
      isLoading={isLoading}
    />
  );
}
