import React, { useEffect, useState } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";

import exportToExcel from "../../../utils/exportToExcel";
import excelConfig from "../../../config/excel";

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
      setChartData(results);
      setIsLoading(false);
      
    }
    loadData();
  }, [facilities, dates, type, disaggregation]);

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

  const handleChartClick = async (value) => {
    setIsLoading(true)
    if (chartType === "clinic") {
      await exportRawData(value)
      setIsLoading(false)
      return
    }
    const response = await api.get("/clinic_samples_tested_by_facility", {
      params: {
        codes: [value],
        dates: dates,
        type: chartType,
        disaggregation: true,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
    const results = response.data;
    setChartData(results);
    setChartType(chartType => chartType === "district" ? "district" : (chartType === "clinic" ? "clinic" : "province"))
    setIsLoading(false)
  };

  async function exportRawData (healthFacility) {
    const jwt_token = localStorage.getItem("@RAuth:token");
    const query = `AnalysisDatetime >= '${dates[0]}' AND AnalysisDatetime <= '${dates[1]}' AND RequestingFacilityName='${healthFacility}' AND ViralLoadResultCategory IS NOT NULL`;
    const response = await api.get("/viralload/all_patients/query/" + query, {
      headers: {
          authorization: `Bearer ${jwt_token}`,
      },
    });
    await exportToExcel(healthFacility, healthFacility, excelConfig?.headers, response.data);
    setIsLoading(false)
  }

  function setChartData(results) {
    var chartLabels = [],
        suppressed = [],
        non_suppressed = [];

    results.map((result) => {
      chartLabels.push(result.facility);
      suppressed.push(result.suppressed);
      non_suppressed.push(result.non_suppressed);
      setChartType(result.type)
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
