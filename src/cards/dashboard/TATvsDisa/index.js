import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MasterCard";
import Chart from "../../../components/Charts/TATvsDisa";

export default function TATvsDisa() {
  const cardId = "dash-tat-vs-disalinks";
  const cardTitle = "TRL vs No. de Disalinks";
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [labelsExcel, setLabelsExcel] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [disalinks, setDisalinks] = useState([]);
  const [tat, setTat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/dash_tat_vs_disalinks");
      const results = response.data;
      var chartLabels = [],
        chartDisalinks = [],
        chartTat = [];

      results.map((result) => {
        chartLabels.push(result.semester);
        chartDisalinks.push(result.disalinks);
        chartTat.push(result.tat);
      });

      setLabels(chartLabels);
      setData([chartTat, chartDisalinks]);
      setLabelsExcel(["", ...chartLabels]);
      setDataExcel([
        ["Tempo de Resposta", ...chartTat],
        ["# Disalinks", ...chartDisalinks],
      ]);
    }
    loadData();
  }, []);

  const handleGetParams = (param) => {
    // setDates([param.startDate, param.endDate]);
  };

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="national"
      handleParams={handleGetParams}
    >
      <Chart labels={labels} dataset={data} />
    </Card>
  );
}
