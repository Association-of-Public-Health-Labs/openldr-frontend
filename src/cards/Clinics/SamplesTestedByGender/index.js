import React from "react";
import hexToRgba from "hex-to-rgba";

import Card from "../../../components/MainCard";
import BarGroup from "../../../components/Charts/BarGroup";

export default function SamplesTestedByGender() {
  const cardId = "clinic-samples-tested-by-gender";
  const cardTitle = "Samples Tested by Gender";

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];

  const datasets = [
    {
      label: "Male (CV < 1000)",
      backgroundColor: "#00b000",
      stack: "Stack 0",
      data: [66, 93, 31, 76, 39, 75, 36]
    },
    {
      label: "Male (CV > 1000)",
      backgroundColor: hexToRgba("#00b000", "0.4"),
      stack: "Stack 0",
      data: [76, 203, 41, 86, 49, 85, 46]
    },
    {
      label: "Female (CV < 1000)",
      backgroundColor: "#e74c3c",
      stack: "Stack 1",
      data: [76, 103, 41, 86, 49, 85, 46]
    },
    {
      label: "Female (CV > 1000)",
      backgroundColor: hexToRgba("#e74c3c", "0.4"),
      stack: "Stack 1",
      data: [56, 56, 83, 21, 66, 29, 65]
    }
  ];

  const labelsExcel = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];

  const dataExcel = [
    ["Male (CV < 1000)", 66, 93, 31, 76, 39, 75, 36],
    ["Male (CV > 1000)", 76, 203, 41, 86, 49, 85, 46],
    ["Female (CV < 1000)", 76, 103, 41, 86, 49, 85, 46],
    ["Female (CV > 1000)", 56, 56, 83, 21, 66, 29, 65]
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={datasets}
      chartLabels={labels}
      menuType="byFacility"
      isLab={false}
      expandable={true}
      menuFixed={true}
    />
  );
}
