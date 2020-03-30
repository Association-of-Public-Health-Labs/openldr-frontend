import React, { useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import hexToRgba from "hex-to-rgba";

import { LineChartContainer } from "./styles";

export default function line({ labels, datasets }) {
  const data = canvas => {
    const ctx = canvas.getContext("2d");

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, hexToRgba(datasets.color, "0"));
    gradientFill.addColorStop(1, hexToRgba(datasets.color, "0.2"));

    return {
      labels: labels,
      datasets: [
        {
          label: datasets.label,
          borderColor: datasets.color,
          pointBorderColor: "#FFF",
          pointBackgroundColor: datasets.color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          shadowColor: "rgba(0,0,0,0.08)",
          shadowOffsetX: 0,
          shadowOffsetY: 7,
          data: datasets.data
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: 0,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            beginAtZero: true
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false,
            drawTicks: true,
            display: true,
            lineWidth: 0.4
          }
        }
      ],
      xAxes: [
        {
          display: 1,
          gridLines: 0,
          barPercentage: 0.2,
          ticks: {
            display: true,
            fontColor: "#cccccc"
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }
      ]
    },
    tooltips: {}
  };

  return (
    <LineChartContainer>
      <Line data={data} options={options} height={280} />
    </LineChartContainer>
  );
}
