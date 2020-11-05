import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesRejected() {
  const cardId = "samples-rejected-by-lab";
  const cardTitle = "Amostras Rejeitadas por Lab";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_rejected", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      console.log(data)
      setIsLoading(false);
      var chartLabels = [],
        rejected = [];

      results.map((result) => {
        chartLabels.push(result.LabName);
        rejected.push(result.rejected);
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Amostras Rejeitadas",
          backgroundColor: "#ef5350",
          data: rejected,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Amostras Rejeitadas", ...rejected],
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
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
      handleParams={handleGetParams}
      isLoading={isLoading}
    >
      <Bar datasets={data} labels={labels} onClick={null} />
      {/* <Bar datasets={data} labels={labels} onClick={handleChartClick} /> */}
    </Card>
  );
}
