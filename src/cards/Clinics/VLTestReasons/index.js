import React, { useState, useEffect } from "react";
import qs from "qs";
import api from "../../../services/api";

import Card from "../../../components/MainCard";

export default function VLTestReasons() {
  const cardTitle = "Samples by Test Reason";
  const cardId = "clinic-vl-test-reason";
  const [labels, setlabels] = useState(["Motivo nao especificado","Rotina","Treatment Failure"])
  const [data, setData] = useState([])

  // const labels = ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"];

  // const data = [12, 19, 63, 17, 28, 24, 7];

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/lab_samples_by_test_reason", {
        params: {
          codes: ["PJV", "PIV"],
          dates: ["2020-01-01", "2020-04-01"]
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      const {reason_not_specified, routine, treatment_failure} = response.data[0]
      setData([reason_not_specified, routine, treatment_failure])
      // console.log(response.data);
    }
    loadData();
  }, []);

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={[data]}
      excelLabels={labels}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={false}
      expandable={true}
      menuFixed={true}
    />
  );
}
