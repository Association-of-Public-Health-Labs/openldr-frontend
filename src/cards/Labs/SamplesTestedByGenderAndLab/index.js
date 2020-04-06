import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";
import Card from "../../../components/MainCard";

export default function SamplesTestedByGenderAndLab() {
  const cardId = "samples-tested-by-gender-and-labs";
  const cardTitle = "Samples tested by gender";
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
      const response = await api.get("/lab_samples_tested_by_gender_and_labs", {
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
        male_suppressed = [],
        female_suppressed = [],
        male_not_suppressed = [],
        female_not_suppressed = [];

      results.map(result => {
        chartLabels.push(result.lab);
        male_suppressed.push(result.male_suppressed);
        female_suppressed.push(result.female_suppressed);
        male_not_suppressed.push(result.male_not_suppressed);
        female_not_suppressed.push(result.female_not_suppressed);
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Homens (CV < 1000)",
          backgroundColor: "#00b000",
          stack: "Stack 0",
          data: male_suppressed
        },
        {
          label: "Homens (CV > 1000)",
          backgroundColor: hexToRgba("#00b000", "0.4"),
          stack: "Stack 0",
          data: male_not_suppressed
        },
        {
          label: "Mulheres (CV < 1000)",
          backgroundColor: "#e74c3c",
          stack: "Stack 1",
          data: female_suppressed
        },
        {
          label: "Mulheres (CV > 1000)",
          backgroundColor: hexToRgba("#e74c3c", "0.4"),
          stack: "Stack 1",
          data: female_not_suppressed
        }
      ]);
      setLabelsExcel(chartLabels);
      setDataExcel([
        male_suppressed,
        male_not_suppressed,
        female_suppressed,
        female_not_suppressed
      ]);
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
