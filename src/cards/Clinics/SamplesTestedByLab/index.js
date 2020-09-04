import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";
// import Card from "../../../components/MainCard";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesTestedByLab() {
  const cardId = "clinic-samples-tested-by-facility";
  const cardTitle = "Amostras Testadas por Provincia";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [chartType, setChartType] = useState("province");
  const [disaggregation, setDisaggregation] = useState(false);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_samples_tested_by_facility", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
          disaggregation: disaggregation,
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
        chartLabels.push(result.facility);
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
      setDisaggregation(false);
    } else if (param.facilityType === "district") {
      setFacilities(param.districts);
      setType(param.facilityType);
      setDisaggregation(false);
    } else if (param.facilityType === "clinic") {
      setFacilities(param.clinics);
      setType(param.facilityType);
      setDisaggregation(false);
    }
    setDates([param.startDate, param.endDate]);
    setIsLoading(true);
  };

  const handleChartClick = (value) => {
    setDisaggregation(true);
    if (chartType === "province") {
      setFacilities([value]);
      setDisaggregation(true);
      setType("district");
      setIsLoading(true);
    } else if (chartType === "district") {
      setFacilities([value]);
      setDisaggregation(true);
      setType("clinic");
      setIsLoading(true);
    } else if (chartType === "clinic") {
      // setFacilities([value]);
    }
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
      isLab={false}
      expandable={true}
      menuFixed={true}
      handleParams={handleGetParams}
      isLoading={isLoading}
    >
      <Bar datasets={data} labels={labels} onClick={handleChartClick} />
    </Card>
  );
}
