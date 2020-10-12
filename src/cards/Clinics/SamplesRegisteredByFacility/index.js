import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import PatientsListPopup from "../../../components/PatientsListPopup";
import Bar from "../../../components/Charts/Bar";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function SamplesRegisteredByFacility() {
  const cardId = "samples-registered-by-facility";
  const cardTitle = "Amostras Registadas por Provincia";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [type, setType] = useState("province");
  const [chartType, setChartType] = useState("province");
  const [disaggregation, setDisaggregation] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);
  const [samplesList, setSamplesList] = useState([])
  const [location, setLocation] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_registered_samples_by_facility", {
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
        registered_samples = [];

      results.map((result) => {
        chartLabels.push(result.facility);
        registered_samples.push(result.total);
        setChartType(result.type);
      });

      setLabels(chartLabels);
      setData([
        {
          label: "Amostras Registadas",
          backgroundColor: "#ef5350",
          data: registered_samples,
        },
      ]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([["Amostras Registadas", ...registered_samples]]);
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

  const handleChartClick = async (value) => {
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
      // setIsLoading(true);
      // const query = `RegisteredDatetime >= '${dates[0]}' AND ResgisteredDatetime <= '${dates[1]}' AND RequestingFacilityName='${value}'`
      // const {data} = await api.get(`/results/query/20/1/${query}`, {
      //   params: {
      //     codes: facilities,
      //     dates: dates,
      //     type: type,
      //     disaggregation: disaggregation,
      //   },
      //   paramsSerializer: (params) => {
      //     return qs.stringify(params);
      //   },
      // });
      // setLocation(value)
      // setSamplesList(data?.docs)
      // setIsLoading(false);
      // setVisible(true)
    }
  };

  const handleCloseMenu = (value) => {
    setVisible(value)
  }

  return (
    <>
    {visible && <PatientsListPopup location={location} data={samplesList} dates={dates} handleCloseMenu={handleCloseMenu}/>}
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
    </Card></>
  );
}
