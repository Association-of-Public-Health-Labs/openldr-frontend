import React, { useContext, useState } from "react";

import Card from "../../../components/MainCard";

export default function TAT() {
  const cardId = "tat-by-month";
  const cardTitle = "Turn around time by month";

  const labels = [
    "Jan,",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ];
  const data = [
    {
      label: "Colheita à Recepção",
      backgroundColor: "#fb8c00",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Recepção ao Registo",
      backgroundColor: "#ef5350",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Registo à Análise",
      backgroundColor: "#00000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Análise à Validação",
      backgroundColor: "#00b000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    }
  ];

  const rows = [data[0].data, data[1].data, data[2].data, data[3].data];

  const labelsExcel = [
    "",
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ];

  const dataExcel = [
    ["Colheita à Recepção", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10],
    ["Recepção ao Registo", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10],
    ["Registo à Análise", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10],
    ["Análise à Validação", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
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
