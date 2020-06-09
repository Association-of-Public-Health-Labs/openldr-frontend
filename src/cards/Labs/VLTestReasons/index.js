import React, { useEffect, useState, useContext } from "react";
import qs from "qs";
import api from "../../../services/api";
import CardContextProvider from "../../../context";
import moment from "moment";

import Card from "../../../components/MainCard";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function VLTestReasons() {
  const cardTitle = "Amostras Testadas";
  const cardId = "vl-test-reason";
  const [labels, setlabels] = useState([
    "Motivo não especificado",
    "Rotina",
    "Falência Terapeutica",
  ]);
  const [data, setData] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_by_test_reason", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const {
        reason_not_specified,
        routine,
        treatment_failure,
      } = response.data[0];
      setData([reason_not_specified, routine, treatment_failure]);
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
      excelData={[data]}
      excelLabels={labels}
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
