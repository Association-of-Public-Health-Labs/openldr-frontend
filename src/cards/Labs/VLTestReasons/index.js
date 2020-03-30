import React from "react";

import Card from "../../../components/MainCard";

export default function VLTestReasons() {
  const cardTitle = "Samples by Test Reason";
  const cardId = "vl-test-reason";

  const labels = ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"];

  const data = [12, 19, 63, 17, 28, 24, 7];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={[data]}
      excelLabels={labels}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
    />
  );
}
