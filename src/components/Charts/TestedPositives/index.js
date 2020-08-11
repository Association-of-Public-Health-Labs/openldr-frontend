import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import "chartjs-plugin-datalabels";
import hexToRgba from "hex-to-rgba";

import { Container } from "./styles";

export default function TestedPositives({ datasets, labels }) {
  const data = (canvas) => {
    const { tested, positives, dailyPositives } = datasets;
    const ctx = canvas.getContext("2d");

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, hexToRgba(positives.color, "0"));
    gradientFill.addColorStop(1, hexToRgba(positives.color, "0"));

    return {
      labels: labels,
      datasets: [
        {
          type: "line",
          label: "Amostras Positivas",
          borderColor: hexToRgba(dailyPositives.color, "1"),
          pointBorderColor: "#FFF",
          pointBackgroundColor: hexToRgba(dailyPositives.color, "1"),
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          shadowColor: "rgba(0,0,0,0.08)",
          shadowOffsetX: 0,
          shadowOffsetY: 7,
          data: dailyPositives.data,
        },
        {
          type: "bar",
          label: "Numero de Testes",
          fill: false,
          backgroundColor: hexToRgba(tested.color, "1"),
          data: tested.data,
        },
      ],
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
          stacked: true,
          display: 1,
          gridLines: 0,
          barPercentage: 0.8,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            padding: 10,
            maxRotation: 0,
            minRotation: 0,
            callback: function (value, index, values) {
              return value;
            },
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
    plugins: {
      datalabels: {
        display: false,
        align: "top",
        // formatter: function (value, context) {
        //   return value;
        // },
      },
    },
  };

  return (
    <Container>
      <Line data={data} height={270} options={options} />
    </Container>
  );
}
