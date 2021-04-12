import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import MixedChart from "../../../components/Charts/MixedChart";

const startDate = moment().subtract(6, "days").startOf("week").format("YYYY-MM-DD");
const endDate = moment().subtract(6, "days").endOf("week").format("YYYY-MM-DD");

export default function SamplesResumeByLab() {
  const cardId = "samples-resume-by-lab";
  const cardTitle = "Relatório Semanal (por lab)";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_weekly_report", {
        params: {
          codes: labs,
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const results = response.data;
      setIsLoading(false);
      var chartLabels = [], registered = [], tested = [], backlogs = [],
        rejected = [], tat = [], capacity = [];

      results.map((result) => {
        chartLabels.push(result.labname);
        rejected.push(result.rejections);
        registered.push(result.registrations);
        tested.push(result.tests);
        backlogs.push(result.backlogs);
        tat.push(result.tat);
        capacity.push(result.capacity)
      });

      setLabels(chartLabels);
      setData([
        {
          label: "TRL",
          backgroundColor: "#000000",
          stack: "Stack 3",
          type: "bubble",
          yAxisID: 'B',
          data: tat,
        },
        {
          label: "Registadas",
          backgroundColor: "#00b000",
          yAxisID: 'A',
          stack: "Stack 0",
          data: registered,
        },
        {
          label: "Testadas",
          backgroundColor: "#fb8c00",
          stack: "Stack 1",
          yAxisID: 'A',
          data: tested,
        },
        {
          label: "Não processadas",
          backgroundColor: "#e74c3c",
          stack: "Stack 2",
          yAxisID: 'A',
          data: backlogs,
        },
        {
          label: "Capacidade",
          backgroundColor: "#7868e6",
          stack: "Stack 3",
          yAxisID: 'A',
          data: capacity,
        },
        
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Amostras Registadas", ...registered],
        ["Amostras Testadas", ...tested],
        ["Amostras não processadas", ...backlogs],
        ["Amostras Rejeitadas", ...rejected],
        ["Capacidade Laboratorial (85%)", ...capacity],
        ["Tempo de Resposta", ...tat],
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
      cardLabel={`De ${dates[0]} à ${dates[1]}`}
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
      dateType="week"
    >
      <MixedChart dataChart={data} labels={labels} onClick={null} />
    </Card>
  );
}
