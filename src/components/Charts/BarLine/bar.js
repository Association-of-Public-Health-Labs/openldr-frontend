import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import "chartjs-plugin-datalabels";

import { Container } from "./styles";

export default function bar({ dataChart, labels, onClick }) {
  const data = (canvas) => {
    return {
      labels: labels,
      datasets: dataChart,
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: 0,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            padding: 10,
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false,
            drawTicks: true,
            display: true,
            lineWidth: 0.4,
          },
        },
      ],
      xAxes: [
        {
          id:'xAxis1',
          type:"category",
          stacked: true,
          display: 1,
          gridLines: 0,
          barPercentage: 0.2,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            padding: 10,
            callback:function(label){
              var month = label.split(": ")[0];
              var week = label.split(": ")[1];
              return week;
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
        {
          id:'xAxis2',
          type:"category",
          stacked: true,
          display: 1,
          gridLines: 0,
          barPercentage: 0.2,
          ticks: {
            display: true,
            fontColor: "#333333",
            // padding: 10,
            // minRotation: 0,
            // maxRotation: 0,
            callback:function(label){
              var month = label.split(": ")[0];
              var week = label.split(": ")[1];
              if(week === "S3"){
                return month.substr(0, 3);
              }else{
                return "";
              }
            }
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    tooltips: {},
    onClick: function (c, i) {
      var e = i[0];
      if (e && onClick) {
        var x_value = this.data.labels[e._index];
        var y_value = this.data.datasets[0].data[e._index];
        onClick(x_value);
      }
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <Bar data={data} height={270} options={options} />
    </Container>
  );
}
