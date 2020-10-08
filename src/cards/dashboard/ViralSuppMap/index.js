import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import groupBy from "json-groupby";
import qs from "qs";
import api from "../../../services/api";
import Card from "../../../components/MasterCard";
import SvgMap from "../../../components/Charts/Map";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function ViralSuppMap() {
  const cardId = "dash-viral-suppression-map";
  const cardTitle = "Média da Supressão Viral";
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
        mapData = [],
        arr_suppressed = [],
        arr_total = [],
        arr_routine = [],
        arr_treatment_failure = [],
        arr_reason_not_specified = [],
        arr_total = [],
        arr_suppressed_perc = [];

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

        arr_suppressed.push(suppressed);
        arr_routine.push(routine);
        arr_treatment_failure.push(treatment_failure);
        arr_reason_not_specified.push(reason_not_specified);
        arr_total.push(total);
        arr_suppressed_perc.push(Math.round((suppressed / total) * 100));
      });
      setLabels(chartLabels);
      setData(results);
      setLabelsExcel(["Motivo de Teste", ...chartLabels]);
      setDataExcel([
        ["Rotina", ...arr_routine],
        ["Falência Terapeutica", ...arr_treatment_failure],
        ["Motivo não especificado", ...arr_reason_not_specified],
        ["Supressão Viral", ...arr_suppressed],
        ["Taxa de Supressão (%)", ...arr_suppressed_perc],
        ["Amostras Testadas", ...arr_total],
      ]);
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
    >
      <SvgMap data={data} labels={labels} />
    </Card>
  );
}
