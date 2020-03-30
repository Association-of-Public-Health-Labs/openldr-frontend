import React from "react";

import Card from "../../../components/MainCard";

const labels = ["Provincia", "Suppressao Viral"];

const data = [
  ["Cabo Delgado", 15],
  ["Niassa", 15],
  ["Nampula", 15],
  ["Zambezia", 15],
  ["Tete", 15],
  ["Sofala", 15],
  ["Manica", 15],
  ["Inhambane", 15],
  ["Gaza", 15],
  ["Maputo Provincia", 15],
  ["Maputo Cidade", 15]
];

const labelsExcel = ["Provincia", "Suppressao Viral"];

const dataExcel = [
  ["Cabo Delgado", 15],
  ["Niassa", 15],
  ["Nampula", 15],
  ["Zambezia", 15],
  ["Tete", 15],
  ["Sofala", 15],
  ["Manica", 15],
  ["Inhambane", 15],
  ["Gaza", 15],
  ["Maputo Provincia", 15],
  ["Maputo Cidade", 15]
];
export default function ViralSuppMap() {
  const cardId = "dash-viral-suppression-map";
  const cardTitle = "Viral Suppression";

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="national"
      height="530px"
    />
  );
}
