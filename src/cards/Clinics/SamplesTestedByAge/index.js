import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";
// import Card from "../../../components/MainCard";

import Card from "../../../components/MasterCard";
import Bar from "../../../components/Charts/Bar";
import PatientsListPopup from "../../../components/PatientsListPopup";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesTestedByAge() {
  const cardId = "clinic-samples-tested-by-age";
  const cardTitle = "Amostras Testadas por idade";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [chartType, setChartType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [disaggregation, setDisaggregation] = useState(false);
  const [age, setAge] = useState([15, 49]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null)
  const [visible, setVisible] = useState(false)
  const [sqlQuery, setSQLQuery] = useState(null)

  useEffect(() => {
    async function loadData() {
      const response = await api.get(
        "/clinic_samples_tested_by_age_and_facility",
        {
          params: {
            codes: facilities,
            dates: dates,
            age: age,
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
    loadData();
  }, [age, facilities, dates]);

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
    setAge([param.age.start, param.age.end]);
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
      setSQLQuery(`AnalysisDatetime >= '${dates[0]}' AND AnalysisDatetime <= '${dates[1]}' AND RequestingFacilityName='${value}' AND ViralLoadResultCategory IS NOT NULL AND AgeInYears >= ${age[0]} AND AgeInYears <= ${age[1]} `)
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
        cardMenu={{ age: true }}
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
        ageLabels={age}
      >
        <Bar datasets={data} labels={labels} onClick={handleChartClick} />
      </Card>
    </>
  );
}
