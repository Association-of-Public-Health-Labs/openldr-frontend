import React from "react";

import Chart from "../../../components/Charts/ChartBarStacked";
import Card from "../../../components/MainCard";

export default function SamplesTestedByPregnancy() {
  const cardId = "samples-tested-by-pregnancy";
  const cardTitle = "Samples Tested by Pregnancy";

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
      label: "CV > 1000",
      backgroundColor: "#fb8c00",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "CV < 1000",
      backgroundColor: "#ef5350",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    }
  ];

  const labelsExcel = [
    "",
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
  const dataExcel = [
    ["CV > 1000", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10],
    ["CV < 1000", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
    />
  );
}
