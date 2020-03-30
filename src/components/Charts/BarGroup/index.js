import React from "react";

import Bar from "./bar";
import Scrollable from "./scrollable";

export default function BarGroup({ labels, datasets }) {
  const total = labels.length;
  return total < 16 ? (
    <Bar labels={labels} datasets={datasets} />
  ) : (
    <Scrollable labels={labels} datasets={datasets} />
  );
}
