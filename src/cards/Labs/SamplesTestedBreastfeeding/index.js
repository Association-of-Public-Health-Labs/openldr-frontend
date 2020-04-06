import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

export default function SamplesTestedBreastfeeding() {
  const cardId = "samples-tested-breastfeeding";
  const cardTitle = "Samples Tested by Breastfeeding";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([
    moment()
      .subtract(1, "year")
      .format("YYYY-MM-DD"),
    moment().format("YYYY-MM-DD")
  ]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_tested_breastfeeding", {
        params: {
          codes: labs,
          dates: dates
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      const results = response.data;
      var chartLabels = [],
        suppressed = [],
        non_suppressed = [];
      results.map(result => {
        chartLabels.push(result.month_name.substring(0, 3));
        suppressed.push(result.suppressed);
        non_suppressed.push(result.non_suppressed);
      });
      setLabels(chartLabels);
      setData([
        {
          label: "CV > 1000",
          backgroundColor: "#fb8c00",
          data: non_suppressed
        },
        {
          label: "CV < 1000",
          backgroundColor: "#ef5350",
          data: suppressed
        }
      ]);
      setLabelsExcel(chartLabels);
      setDataExcel([suppressed, non_suppressed]);
    }
    loadData();
  }, [labs, dates]);

  const handleGetParams = param => {
    setLabs(param.labs);
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
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
      handleParams={handleGetParams}
    />
  );
}
