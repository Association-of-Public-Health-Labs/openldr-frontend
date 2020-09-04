import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesTestedByPregnancy() {
  const cardId = "samples-tested-by-pregnancy";
  const cardTitle = "Amostras Testadas (Mulheres Grávidas)";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_tested_pregnant", {
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
      var chartLabels = [],
        suppressed = [],
        non_suppressed = [];
      results.map((result) => {
        chartLabels.push(result.month_name.substring(0, 3));
        suppressed.push(result.suppressed);
        non_suppressed.push(result.non_suppressed);
      });
      setLabels(chartLabels);
      setData([
        {
          label: "CV > 1000",
          backgroundColor: "#fb8c00",
          data: non_suppressed,
        },
        {
          label: "CV < 1000",
          backgroundColor: "#ef5350",
          data: suppressed,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["CV < 1000", ...suppressed],
        ["CV > 1000", ...non_suppressed],
      ]);
    }
    loadData();
  }, [labs, dates]);

  const handleGetParams = (param) => {
    const laboratories = [];
    const labCodes = param.labs;
    if (labCodes && labCodes.length > 0) {
      labCodes.map((lab) => {
        laboratories.push(...lab);
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
    </Card>
  );
}
