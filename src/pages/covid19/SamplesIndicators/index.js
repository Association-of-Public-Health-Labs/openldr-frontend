import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import moment from "moment";
import { ThemeContext } from "styled-components";
import qs from "qs";

import { Container, MainPanel, Content } from "../../styles";

import api from "../../../services/api";
import { covid19 } from "../../../utils/menuConfig";

import SideBar from "../../../components/Menus/SideBar";
import Header from "../../../components/Menus/MenuHeader";
import Covid19ResultsTable from "../../../components/Covid19ResultsTable";
import Card from "../../../components/MainCard";
import CardLoader from "../../../components/CardLoader";

const startDate = moment().subtract(15, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

function SamplesIndicators({ props }) {
  const cardId = "dash-samples-history";
  const cardTitle = "Resumo de Indicadores";
  const { colors } = useContext(ThemeContext);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [registeredSamples, setRegisteredSamples] = useState([]);
  const [testedSamples, setTestedSamples] = useState([]);
  const [rejectedSamples, setRejectedSamples] = useState([]);
  const [nonValidatedSamples, setNonValidatedSamples] = useState([]);
  const [suppressedSamples, setSuppressedSamples] = useState([]);
  const [dates, setDates] = useState([startDate, endDate]);
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { province } = useParams();

  useEffect(() => {
    async function loadData() {
      const token = await localStorage.getItem("@RAuth:token");
      const response = await api.get(`/samplesindicators`, {
        params: {
          dates: dates,
          provinces: [province],
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
      var tableLabels = [
          "Provincia",
          "Distrito",
          "Amostras Recebidas",
          "Amostras Testadas",
          "Amostras Validadas",
          "Amostras Pendentes",
          "Amostras Rejeitadas",
          "Casos Positivos",
          "Positividade (%)",
        ],
        registered = [],
        tested = [],
        non_validated = [],
        rejected = [],
        suppressed = [];

      var tableRows = [];

      results.map((result, index) => {
        tableRows[index] = [
          result.RequestingProvinceName,
          result.RequestingDistrictName,
          result.samples_receipt,
          result.samples_tested,
          result.samples_authorised,
          result.samples_pending,
          result.samples_rejected,
          result.samples_positive,
          result.samples_tested === 0
            ? null
            : Math.round(
                (result.samples_positive / result.samples_tested) * 100
              ),
        ];
      });
      setLabels(tableLabels);
      setRegisteredSamples(registered);
      setTestedSamples(tested);
      setRejectedSamples(rejected);
      setNonValidatedSamples(non_validated);
      setSuppressedSamples(suppressed);
      setRows(tableRows);
    }
    loadData();
  }, [dates]);

  const handleGetParams = (param) => {
    setDates([param.startDate, param.endDate]);
    setIsDataLoaded(false);
  };

  const header = labels;

  return (
    <>
      <Container>
        <SideBar active="covid19results" menu={covid19} />
        <MainPanel>
          <Header
            page=""
            id="home"
            menu={covid19}
            selectedDashboard="Carga Viral"
          />
          <Content>
            {!isDataLoaded && <CardLoader />}
            <Card
              cardId={cardId}
              cardTitle={cardTitle}
              cardLabel={
                dates[0] === startDate && dates[1] === endDate
                  ? "Últimas 24 horas"
                  : `De ${dates[0]} à ${dates[1]}`
              }
              excelData={rows}
              excelLabels={header}
              chartData={rows}
              chartLabels={header}
              menuType="national"
              borderRadius="4px"
              handleParams={handleGetParams}
            />
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}

export default SamplesIndicators;
