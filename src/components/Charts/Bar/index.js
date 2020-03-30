import React, { useEffect } from "react";

import BarChart from "./bar";
import Scrollable from "./scrollable";

export default function Bar({ labels, datasets }) {
  const total = labels.length;
  return total < 16 ? (
    <BarChart labels={labels} dataChart={datasets} />
  ) : (
    <Scrollable labels={labels} datasets={datasets} />
  );
}
