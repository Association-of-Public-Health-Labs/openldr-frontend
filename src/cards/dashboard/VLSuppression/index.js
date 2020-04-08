import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { ThemeContext } from "styled-components";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

export default function VlSuppression() {
  const cardId = "dash-viral-suppression";
  const cardTitle = "Viral Suppression";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [dates, setDates] = useState([
    moment().subtract(1, "year").format("YYYY-MM-DD"),
    moment().subtract(1, "month").format("YYYY-MM-DD"),
  ]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_viral_suppression", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const results = response.data;
      var chartLabels = [],
        chartData = [];

      // console.log(results);

      results.map((result) => {
        chartLabels.push(result.month_name.substring(0, 3));
        const { suppressed, total } = result;
        if (total > 0) {
          chartData.push(Math.round((suppressed / total) * 100));
        } else {
          chartData.push(0);
        }
      });
      setLabels(chartLabels);
      setData(chartData);
      setLabelsExcel(chartLabels);
      setDataExcel([chartData]);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
  };

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={{
        label: "Supressao Viral",
        color: colors.primary,
        data: data,
      }}
      chartLabels={labels}
      menuType="national"
      height="400px"
      handleParams={handleGetParams}
    />
  );
}
