import React from "react";

import LineChart from "./line";
import Scrollable from "./scrollable";

export default function LineCovid19({ labels, datasets }) {
  // const total = labels.length;
  return <LineChart labels={labels} datasets={datasets} />;
}
