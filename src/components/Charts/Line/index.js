import React from "react";

import LineChart from "./line";
import Scrollable from "./scrollable";

export default function Line({ labels, datasets }) {
  const total = labels.length;
  return total < 13 ? (
    <LineChart labels={labels} datasets={datasets} />
  ) : (
    <Scrollable labels={labels} datasets={datasets} />
  );
}
