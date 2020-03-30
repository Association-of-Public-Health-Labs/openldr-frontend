import React, { useContext } from "react";
import { Chart, Line } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";

import { Container, Body } from "./styles";
import { Header, CardTitle } from "../../styles";

import Card from "../../../components/MainCard";

export default function TATvsDisa() {
  const cardId = "dash-tat-vs-disalinks";
  const cardTitle = "TAT vs No. of Disalinks";

  const labels = [
    "FY18Q1",
    "FY18Q2",
    "FY18Q3",
    "FY18Q4",
    "FY19Q1",
    "FY19Q2",
    "FY19Q3",
    "FY19Q4"
  ];
  const data = [
    [40, 500, 650, 700, 1200, 1250, 1300, 1900],
    [1700, 1200, 1000, 900, 750, 600, 560, 20]
  ];

  const labelsExcel = [
    "",
    "FY18Q1",
    "FY18Q2",
    "FY18Q3",
    "FY18Q4",
    "FY19Q1",
    "FY19Q2",
    "FY19Q3",
    "FY19Q4"
  ];
  const dataExcel = [
    ["TAT", 40, 500, 650, 700, 1200, 1250, 1300, 1900],
    ["#Disalinks", 1700, 1200, 1000, 900, 750, 600, 560, 20]
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="national"
    />
  );
}
