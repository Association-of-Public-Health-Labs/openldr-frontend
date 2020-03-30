import React, { useState, useContext } from "react";
import { ThemeContext } from "styled-components";

import Card from "../../../components/MainCard";

export default function VlSuppression() {
  const cardId = "dash-viral-suppression";
  const cardTitle = "Viral Suppression";
  const { colors } = useContext(ThemeContext);

  const labels = [
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

  const data = {
    label: "Supressao Viral",
    color: colors.primary,
    data: [75, 60, 80, 72, 64, 68, 72, 71, 70, 68, 72, 71]
  };

  const labelsExcel = [
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
    ["Supressao Viral", 75, 60, 80, 72, 64, 68, 72, 71, 70, 68, 72, 71]
  ];

  const rows = [data.data];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="national"
      height="400px"
    />
  );
}
