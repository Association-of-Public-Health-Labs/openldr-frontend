import React, { useEffect } from "react";

import BarChart from "./bar";
import Scrollable from "./scrollable";

export default function Bar({ labels, datasets, onClick }) {
  return <BarChart labels={labels} dataChart={datasets} onClick={onClick} />;
}
