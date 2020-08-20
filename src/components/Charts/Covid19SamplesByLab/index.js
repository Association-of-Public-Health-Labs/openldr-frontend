import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import "chartjs-plugin-datalabels";

import { Container } from "./styles";

export default function Covid19SamplesByLab({ labels, datasets }) {
  const data = (canvas) => {
    return {
      labels: labels,
      datasets: datasets,
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
          barPercentage: 0.2,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            padding: 10,
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
      },
    },
  };

  return (
    <Container>
      <Bar data={data} height={270} options={options} />
    </Container>
  );
}
