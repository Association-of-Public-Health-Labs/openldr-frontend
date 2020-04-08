import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { ThemeContext } from "styled-components";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

export default function Indicators() {
  const cardId = "dash-samples-history";
  const cardTitle = "Resumo de Indicadores";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [registeredSamples, setRegisteredSamples] = useState([]);
  const [testedSamples, setTestedSamples] = useState([]);
  const [rejectedSamples, setRejectedSamples] = useState([]);
  const [nonValidatedSamples, setNonValidatedSamples] = useState([]);
  const [suppressedSamples, setSuppressedSamples] = useState([]);
  const [dates, setDates] = useState([
    moment().subtract(1, "year").format("YYYY-MM-DD"),
    moment().subtract(1, "month").format("YYYY-MM-DD"),
  ]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_indicators", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const results = response.data;
      var tableLabels = ["Indicadores"],
        registered = ["Amostras Registadas"],
        tested = ["Amostras Testadas"],
        non_validated = ["Amostras nao validadas"],
        rejected = ["Amostras Rejeitadas"],
        suppressed = ["Amostras com CV<1000"];

      results.map((result) => {
        tableLabels.push(result.month_name.substring(0, 3));
        registered.push(result.registered);
        tested.push(result.tested);
        non_validated.push(result.non_validated);
        rejected.push(result.rejected);
        suppressed.push(result.suppressed);
      });
      setLabels(tableLabels);
      setRegisteredSamples(registered);
      setTestedSamples(tested);
      setRejectedSamples(rejected);
      setNonValidatedSamples(non_validated);
      setSuppressedSamples(suppressed);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
  };

  const header = labels;

  const rows = [
    registeredSamples,
    testedSamples,
    suppressedSamples,
    nonValidatedSamples,
    rejectedSamples,
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={rows}
      excelLabels={header}
      chartData={rows}
      chartLabels={header}
      menuType="national"
      borderRadius="4px"
      handleParams={handleGetParams}
    />
  );
}
