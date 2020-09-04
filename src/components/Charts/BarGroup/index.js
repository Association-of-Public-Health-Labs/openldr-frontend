import React from "react";

import Bar from "./bar";
import Scrollable from "./scrollable";

export default function BarGroup({ labels, datasets, onClick }) {
  return <Bar labels={labels} datasets={datasets} onClick={onClick} />;
}
