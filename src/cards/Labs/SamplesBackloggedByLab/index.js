import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/BarLine";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesBackloggededByLab() {
  const cardId = "samples-backlogged-by-lab";
  const cardTitle = "Amostras Pendentes por Semana";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);
  const [labNames, setLabNames] = useState([])

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_backlogs", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      console.log("backlog", response.data);
      setIsLoading(false);
      var chartLabels = [],
        backlogs = [],
        tests = [];

      results.map((result) => {
        chartLabels.push(result.month +': S' + result.week_number);
        backlogs.push(result.backlogs);
        tests.push(result.tests)
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Amostras Testadas",
          type: "line",
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ef5350",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#ef5350",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          shadowColor: "rgba(0,0,0,0.08)",
          shadowOffsetX: 0,
          shadowOffsetY: 7,
          data: tests,
        },
        {
          label: "Amostras Pendentes",
          backgroundColor: "#fb8c00",
          data: backlogs,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Amostras Pendentes", ...backlogs],
        ["Amostras Testadas", ...tests],
      ]);
    }
    loadData();
  }, [labs, dates]);

  const handleGetParams = (param) => {
    const laboratories = [];
    const labNames = [];
    const labList = param.labs;
    if (labList && labList.length > 0) {
      labList.map((lab) => {
        const labCode = lab.LabCode;
        laboratories.push(...labCode);
        labNames.push(lab.LabName);
      });
    }

    setLabs(laboratories);
    setLabNames(labNames)
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
          : "Últimas 18 semanas"
      }
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
      handleParams={handleGetParams}
      isLoading={isLoading}
      footerFacilitiesList={labNames}
    >
      <Bar datasets={data} labels={labels} onClick={null} />
    </Card>
  );
}
