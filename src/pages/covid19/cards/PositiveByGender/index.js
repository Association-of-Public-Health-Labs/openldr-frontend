import React, { useState, useEffect } from "react";
import qs from "qs";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../../../services/api";

import Card from "../../../../components/MainCard";

import { Container, Progress } from "./styles";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function PositiveByGender() {
  const cardTitle = "Casos Positivos por genero";
  const cardId = "clinic-vl-test-reason";
  const [labels, setlabels] = useState([
    "Genero não especificado",
    "Masculino",
    "Feminino",
  ]);
  const [data, setData] = useState([]);
  const [type, setType] = useState("province");
  const [facilities, setFacilities] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/covid19-by-gender", {
        params: {
          codes: facilities,
          dates: dates,
          type: type,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const { male, female, not_specified } = response.data[0];
      setData([not_specified, male, female]);
      setIsDataLoaded(true);
      // console.log(response.data);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  return (
    <Container>
      {!isDataLoaded && (
        <Progress>
          <CircularProgress />
        </Progress>
      )}
      <Card
        cardId={cardId}
        cardTitle={cardTitle}
        cardLabel={
          dates[0] !== startDate || dates[1] !== endDate
            ? `De ${dates[0]} à ${dates[1]}`
            : "Todos Registos"
        }
        excelData={[data]}
        excelLabels={labels}
        chartData={data}
        chartLabels={labels}
        menuType="national"
        isLab={false}
        expandable={false}
        menuFixed={true}
        height="400px"
        handleParams={handleGetParams}
      />
    </Container>
  );
}
