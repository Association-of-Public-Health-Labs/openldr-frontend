import React, { useEffect, useState, useContext } from "react";
import qs from "qs";
import api from "../../../services/api";
import CardContextProvider from "../../../context";
import moment from "moment";

import Card from "../../../components/MasterCard";
import Pie from "../../../components/Charts/PieChart";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function VLTestReasons() {
  const cardTitle = "Motivo das amostras testadas";
  const cardId = "vl-test-reason";
  const [labels, setlabels] = useState([
    "Motivo não especificado",
    "Rotina",
    "Falência Terapeutica",
  ]);
  const [data, setData] = useState([]);
  const [labs, setLabs] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_by_test_reason", {
        params: {
          codes: labs,
          dates: dates,
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
      setIsLoading(false);
      setData([reason_not_specified, routine, treatment_failure]);
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
      excelData={[data]}
      excelLabels={labels}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
      handleParams={handleGetParams}
      isLoading={isLoading}
    >
      <Pie datasets={data} labels={labels} />
    </Card>
  );
}
