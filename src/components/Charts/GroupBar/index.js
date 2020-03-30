import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";

import { Container } from "./styles";

export default function GroupBar({ dataChart, labels }) {
  const data = canvas => {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Member Agreement Tracker",
          backgroundColor: "#00b000",
          stack: "Stack 0",
          data: [66, 93, 31, 76, 39, 75, 36]
        },
        {
          label: "Employee On Boarding",
          backgroundColor: hexToRgba("#00b000", "0.4"),
          stack: "Stack 0",
          data: [76, 203, 41, 86, 49, 85, 46]
        },
        {
          label: "Vendor Payment",
          backgroundColor: "#e74c3c",
          stack: "Stack 1",
          data: [76, 103, 41, 86, 49, 85, 46]
        },
        {
          label: "Employee On Boarding",
          backgroundColor: hexToRgba("#e74c3c", "0.4"),
          stack: "Stack 1",
          data: [56, 56, 83, 21, 66, 29, 65]
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom"
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
            padding: 10
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
          stacked: true,
          display: 1,
          gridLines: 0,
          barPercentage: 0.2,
          ticks: {
            display: true,
            fontColor: "#cccccc",
            padding: 10
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
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    tooltips: {}
  };

  return (
    <Container>
      <Bar data={data} height={270} options={options} />
    </Container>
  );
}
