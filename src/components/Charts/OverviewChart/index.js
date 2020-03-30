import React from "react";
import { Line, Bar } from "react-chartjs-2";
import hexToRgba from "hex-to-rgba";

import { Container } from "./styles";

export default function OverviewChart({ labels, dataset, color }) {
  const data = canvas => {
    const ctx = canvas.getContext("2d");

    var gradientFill = ctx.createLinearGradient(248, 162, 0, 50);
    gradientFill = ctx.createLinearGradient(248, 162, 0, 50);
    gradientFill.addColorStop(0, hexToRgba(color, "0"));
    gradientFill.addColorStop(1, hexToRgba(color, "0.04"));

    return {
      labels: labels,
      datasets: [
        {
          label: "Email Stats",
          borderColor: color,
          pointBorderColor: "#FFF",
          pointBackgroundColor: color,
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
          data: dataset
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      caretPadding: 2,
      displayColors: false,
      callbacks: {
        title: function(tooltipItems, data) {
          return "";
        },
        label: function(tooltipItem, data) {
          var datasetLabel = "";
          var label = data.labels[tooltipItem.index];
          return data.datasets[tooltipItem.datasetIndex].data[
            tooltipItem.index
          ];
        }
      }
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: 0,
          ticks: {
            display: false,
            padding: 0,
            beginAtZero: false
          }
        }
      ],
      xAxes: [
        {
          display: 0,
          gridLines: 0,
          ticks: {
            display: false,
            padding: 0,
            beginAtZero: false
          }
        }
      ]
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0
      }
    }
  };
  return (
    <Container>
      <Line data={data} options={options} />
    </Container>
  );
}
