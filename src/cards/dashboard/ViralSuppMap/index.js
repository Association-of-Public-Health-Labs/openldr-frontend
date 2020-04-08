import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import groupBy from "json-groupby";
import qs from "qs";
import api from "../../../services/api";
import Card from "../../../components/MainCard";

const labels = ["Provincia", "Suppressao Viral"];

const data = {
  ns: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  cd: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  np: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  zb: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  tt: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  sf: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  mn: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  gz: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  ib: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
  mp: {
    suppressed: 70,
    routine: 80,
    treatment_failure: 12,
    reason_not_specified: 8,
  },
};

const labelsExcel = ["Provincia", "Suppressao Viral"];

const dataExcel = [
  ["Cabo Delgado", 15],
  ["Niassa", 15],
  ["Nampula", 15],
  ["Zambezia", 15],
  ["Tete", 15],
  ["Sofala", 15],
  ["Manica", 15],
  ["Inhambane", 15],
  ["Gaza", 15],
  ["Maputo Provincia", 15],
  ["Maputo Cidade", 15],
];
export default function ViralSuppMap() {
  const cardId = "dash-viral-suppression-map";
  const cardTitle = "Viral Suppression";
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
      const response = await api.get("/dash_map", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });

      const results = response.data;
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
        // setData(prevState => [...prevState]
        mapData[result.province] = {
          suppressed: Math.round((suppressed / total) * 100),
          routine: Math.round((routine / suppressed) * 100),
          treatment_failure: Math.round((treatment_failure / suppressed) * 100),
          reason_not_specified: Math.round(
            (reason_not_specified / suppressed) * 100
          ),
        };

        // setLabelsExcel(chartLabels);
        // setDataExcel([chartData]);
      });
      // console.log(groupBy(results, ["province"]));
      setLabels(chartLabels);
      setData(results);
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
      chartData={data}
      chartLabels={labels}
      menuType="national"
      height="530px"
      handleParams={handleGetParams}
    />
  );
}
