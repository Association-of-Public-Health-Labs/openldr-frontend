import React from "react";
import Pie from "../components/Charts/PieChart";
import Chart from "../components/Charts/ChartBarStacked";
import Bar from "../components/Charts/Bar";
import BarGroup from "../components/Charts/BarGroup";
import Line from "../components/Charts/Line";
import SvgMap from "../components/Charts/Map";
import TATvsDisa from "../components/Charts/TATvsDisa";
import DataTable from "../components/DataTable";
const cards = [];

cards["vl-test-reason"] = {
  id: "vl-test-reason",
  name: "Samples by test reason",
  description: "",
  content: function (data, labels) {
    return <Pie datasets={data} labels={labels} />;
  },
};

cards["tat-by-month"] = {
  id: "tat-by-month",
  name: "Turn around time by month",
  description: "Tun",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["tat-by-lab"] = {
  id: "tat-by-lab",
  name: "Turn around time by lab",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

cards["sampes-tested"] = {
  id: "sampes-tested",
  name: "Samples tested by month",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["samples-tested-by-pregnancy"] = {
  id: "samples-tested-by-pregnancy",
  name: "Samples tested by pregnancy",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

cards["samples-tested-by-month"] = {
  id: "samples-tested-by-month",
  name: "Samples tested by month",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["samples-tested-by-gender"] = {
  id: "samples-tested-by-gender",
  name: "Samples tested by gender",
  description: "",
  content: function (data, labels) {
    return <BarGroup datasets={data} labels={labels} />;
  },
};

cards["samples-tested-by-gender-and-labs"] = {
  id: "samples-tested-by-gender-and-labs",
  name: "Samples tested by gender",
  description: "",
  content: function (data, labels) {
    return <BarGroup datasets={data} labels={labels} />;
  },
};

cards["samples-tested-by-age"] = {
  id: "samples-tested-by-age",
  name: "Samples tested by age",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["samples-tested-breastfeeding"] = {
  id: "samples-tested-breastfeeding",
  name: "Samples tested by Breastfeeding",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

// Dashboard Cards
cards["dash-viral-suppression"] = {
  id: "dash-viral-suppression",
  name: "Viral Suppression",
  description: "",
  content: function (data, labels) {
    return <Line labels={labels} datasets={data} />;
  },
};

cards["dash-viral-suppression-map"] = {
  id: "dash-viral-suppression-map",
  name: "Viral Suppression",
  description: "",
  content: function (data, labels) {
    return <SvgMap data={data} labels={labels} />;
  },
};

cards["dash-tat-vs-disalinks"] = {
  id: "dash-tat-vs-disalinks",
  name: "TAT vs No. of Disalinks",
  description: "",
  content: function (data, labels) {
    return <TATvsDisa labels={labels} dataset={data} />;
  },
};

cards["dash-samples-history"] = {
  id: "dash-samples-history",
  name: "Resumo de Indicadores",
  description: "",
  content: function (data, labels) {
    return <DataTable header={labels} rows={data} />;
  },
};

// Clinic Cards
cards["clinic-vl-test-reason"] = {
  id: "clinic-vl-test-reason",
  name: "Samples by test reason",
  description: "",
  content: function (data, labels) {
    return <Pie datasets={data} labels={labels} />;
  },
};

cards["clinic-tat-by-month"] = {
  id: "clinic-tat-by-month",
  name: "Turn around time by month",
  description: "Tun",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["tat-by-clinic"] = {
  id: "tat-by-clinic",
  name: "Turn around time by lab",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

cards["clinic-sampes-tested"] = {
  id: "clinic-sampes-tested",
  name: "Samples tested by month",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["clinic-samples-tested-by-pregnancy"] = {
  id: "clinic-samples-tested-by-pregnancy",
  name: "Samples tested by pregnancy",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

cards["clinic-samples-tested-by-month"] = {
  id: "clinic-samples-tested-by-month",
  name: "Samples tested by month",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["clinic-samples-tested-by-gender"] = {
  id: "clinic-samples-tested-by-gender",
  name: "Samples tested by gender",
  description: "",
  content: function (data, labels) {
    return <BarGroup datasets={data} labels={labels} />;
  },
};

cards["clinic-samples-tested-by-age"] = {
  id: "clinic-samples-tested-by-age",
  name: "Samples tested by age",
  description: "",
  content: function (data, labels) {
    return <Chart dataChart={data} labels={labels} />;
  },
};

cards["clinic-samples-tested-breastfeeding"] = {
  id: "clinic-samples-tested-breastfeeding",
  name: "Samples tested by Breastfeeding",
  description: "",
  content: function (data, labels) {
    return <Bar datasets={data} labels={labels} />;
  },
};

export default cards;
