import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Chart from "../../../components/Charts/ChartBarStacked";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesTestedMonthly() {
  const cardId = "clinic-sampes-tested";
  const cardTitle = "Amostras Testadas por Provincia/mês";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_samples_tested_by_month", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
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
  }, [facilities, dates]);

  const handleGetParams = (param) => {
    if (param.facilityType === "province") {
      setFacilities(param.provinces);
      setType(param.facilityType);
    } else if (param.facilityType === "district") {
      setFacilities(param.districts);
      setType(param.facilityType);
    } else if (param.facilityType === "clinic") {
      setFacilities(param.clinics);
      setType(param.facilityType);
    }
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
      cardMenu={{ sampleType: true }}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={false}
      expandable={true}
      menuFixed={true}
      handleParams={handleGetParams}
      isLoading={isLoading}
      footerFacilitiesList={facilities}
    >
      <Chart dataChart={data} labels={labels} />
    </Card>
  );
}
