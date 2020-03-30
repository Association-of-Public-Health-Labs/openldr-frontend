import React from "react";

import Chart from "../../../components/Charts/ChartBarStacked";
import Card from "../../../components/MainCard";

export default function SamplesTestedMonthly() {
  const cardId = "clinic-sampes-tested";
  const cardTitle = "Samples Tested";

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
  const excelData = [
    ["CV > 1000", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10],
    ["CV < 1000", 10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      cardMenu={{ sampleType: true }}
      excelData={excelData}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={false}
      expandable={true}
      menuFixed={true}
    />
  );
}
