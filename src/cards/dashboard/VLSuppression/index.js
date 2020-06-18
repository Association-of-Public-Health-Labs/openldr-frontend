import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { ThemeContext } from "styled-components";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";
import CardLoader from "../../../components/CardLoader";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function VlSuppression() {
  const cardId = "dash-viral-suppression";
  const cardTitle = "Supressão Viral";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      var chartLabels = [],
        chartData = [];

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
    setIsLoading(true);
  };

  return (
    <>
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
        chartData={{
          label: "Supressao Viral",
          color: colors.primary,
          data: data,
        }}
        chartLabels={labels}
        menuType="national"
        height="400px"
        handleParams={handleGetParams}
        isLoading={isLoading}
      />
    </>
  );
}
