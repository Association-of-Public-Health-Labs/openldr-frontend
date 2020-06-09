import React, { useState, useEffect } from "react";
import qs from "qs";
import moment from "moment";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function VLTestReasons() {
  const cardTitle = "Amostras Testadas";
  const cardId = "clinic-vl-test-reason";
  const [labels, setlabels] = useState([
    "Motivo não especificado",
    "Rotina",
    "Falência Terapeutica",
  ]);
  const [data, setData] = useState([]);
  const [type, setType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/clinic_samples_by_test_reason", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      });
      const {
        reason_not_specified,
        routine,
        treatment_failure,
      } = response.data[0];
      setData([reason_not_specified, routine, treatment_failure]);
      // console.log(response.data);
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
      excelData={[data]}
      excelLabels={labels}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={false}
      expandable={true}
      menuFixed={true}
      handleParams={handleGetParams}
    />
  );
}
