import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";
// import Card from "../../../components/MainCard";

import Card from "../../../components/MasterCard";
import BarGroup from "../../../components/Charts/BarGroup";
import PatientsListPopup from "../../../components/PatientsListPopup";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesTestedByGender() {
  const cardId = "clinic-samples-tested-by-gender";
  const cardTitle = "Amostras Testadas por Provincia/gênero";
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
  const [location, setLocation] = useState(null)
  const [visible, setVisible] = useState(false)
  const [sqlQuery, setSQLQuery] = useState(null)

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        "/clinic_samples_tested_by_gender_and_facility",
        {
          params: {
            codes: facilities,
            dates: dates,
            type: type,
            disaggregation: disaggregation,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        }
      );
      const results = response.data;
      setIsLoading(false);
      var chartLabels = [],
        male_suppressed = [],
        female_suppressed = [],
        male_not_suppressed = [],
        female_not_suppressed = [];

      results.map((result) => {
        chartLabels.push(result.facility);
        male_suppressed.push(result.male_suppressed);
        female_suppressed.push(result.female_suppressed);
        male_not_suppressed.push(result.male_not_suppressed);
        female_not_suppressed.push(result.female_not_suppressed);
        setChartType(result.type)
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Homens (CV < 1000)",
          backgroundColor: "#00b000",
          stack: "Stack 0",
          data: male_suppressed,
        },
        {
          label: "Homens (CV > 1000)",
          backgroundColor: hexToRgba("#00b000", "0.4"),
          stack: "Stack 0",
          data: male_not_suppressed,
        },
        {
          label: "Mulheres (CV < 1000)",
          backgroundColor: "#e74c3c",
          stack: "Stack 1",
          data: female_suppressed,
        },
        {
          label: "Mulheres (CV > 1000)",
          backgroundColor: hexToRgba("#e74c3c", "0.4"),
          stack: "Stack 1",
          data: female_not_suppressed,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Homens (CV < 1000)", ...male_suppressed],
        ["Homens (CV > 1000)", ...male_not_suppressed],
        ["Mulheres (CV < 1000)", ...female_suppressed],
        ["Mulheres (CV > 1000)", ...female_not_suppressed],
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
    }else if (chartType === "clinic") {
      setSQLQuery(`AnalysisDatetime >= '${dates[0]}' AND AnalysisDatetime <= '${dates[1]}' AND RequestingFacilityName='${value}' AND ViralLoadResultCategory IS NOT NULL`)
      setLocation(value)
      setVisible(true)
    }
  };

  const handleClosePopup = (value) => {
    setVisible(value)
  }

  return (
    <>
    {visible && <PatientsListPopup location={location} dates={dates} query={sqlQuery} handleClosePopup={handleClosePopup}/>}
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
      <BarGroup datasets={data} labels={labels} onClick={handleChartClick} />
    </Card>
    </>
  );
}
