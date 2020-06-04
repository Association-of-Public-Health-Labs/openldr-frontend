import React, { useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../../../../services/api";
import Card from "../../../../components/MainCard";
import MapCard from "../../../../components/Charts/MapGraph";
import EditButton from "../../../../components/MaterialUI/EditButton";
import MenuCard from "../../../../components/Menus/CardMenu";
import { Container, Header, CardTitle, CardMenu, Progress } from "./styles";

const startDate = moment().subtract(1, "year").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

export default function Map() {
  const cardId = "covid19-map";
  const cardTitle = "Casos por Provincia";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dates, setDates] = useState([startDate, endDate]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get("/positivebyprovince", {
        params: {
          dates: dates,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setIsDataLoaded(true);
      const results = response.data;
      var chartLabels = [];
      var provinceData = [];
      results.map((result) => {
        chartLabels.push(result.province);
        provinceData[result.province] = {
          tested: result.total,
          pending: result.pending,
          positive: result.positive,
        };
      });
      setLabels(chartLabels);
      setData(results);
      setProvinces(provinceData);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  const handleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container>
      {!isDataLoaded && (
        <Progress>
          <CircularProgress />
        </Progress>
      )}
      {isMenuOpen && (
        <MenuCard
          borderRadius="20px"
          handleCloseMenu={handleMenu}
          handleGetParams={handleGetParams}
        />
      )}
      <Header>
        <CardTitle>
          <h5>
            {dates[0] === startDate && dates[1] === endDate
              ? "Últimas 24 horas"
              : `De ${dates[0]} à ${dates[1]}`}
          </h5>
          <h3>Casos Positivos</h3>
        </CardTitle>
        <CardMenu>
          <EditButton openMenu={handleMenu} />
        </CardMenu>
      </Header>
      <MapCard data={provinces} label="Total de casos positivos" />
    </Container>
  );
}
