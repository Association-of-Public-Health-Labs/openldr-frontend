import React, { useContext } from "react";
import { Chart, Line } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";

import { Container, Body } from "./styles";
import { Header, CardTitle } from "../../styles";

export default function TATvsDisa() {
  const { colors } = useContext(ThemeContext);
  const data = canvas => {
    const ctx = canvas.getContext("2d");

    var gradientFillTAT = ctx.createLinearGradient(0, 200, 0, 50);
    var gradientFillDisa = ctx.createLinearGradient(0, 200, 0, 50);

    gradientFillTAT = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFillTAT.addColorStop(0, hexToRgba(colors.primary, "0"));
    gradientFillTAT.addColorStop(1, hexToRgba(colors.primary, "0.07"));

    gradientFillDisa = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFillDisa.addColorStop(0, hexToRgba(colors.secondary, "0"));
    gradientFillDisa.addColorStop(1, hexToRgba(colors.secondary, "0.07"));

    return {
      labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
      datasets: [
        {
          label: "Email Stats",
          borderColor: colors.primary,
          pointBorderColor: "#FFF",
          pointBackgroundColor: colors.primary,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFillTAT,
          borderWidth: 2,
          shadowColor: "rgba(0,0,0,0.08)",
          shadowOffsetX: 0,
          shadowOffsetY: 7,
          data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        },
        {
          label: "Email Stats",
          borderColor: colors.secondary,
          pointBorderColor: "#FFF",
          pointBackgroundColor: colors.secondary,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFillDisa,
          borderWidth: 2,
          shadowColor: "rgba(0,0,0,0.08)",
          shadowOffsetX: 0,
          shadowOffsetY: 7,
          data: [1700, 1200, 1000, 900, 750, 600, 560, 20]
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
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: 0,
          ticks: {
            display: false,
            fontColor: "#cccccc",
            padding: 0
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
    }
    // layout: {
    //   padding: {
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0
    //   }
    // }
  };

  return (
    <Container>
      <Header>
        <CardTitle>
          <h5>Ultimos 12 meses</h5>
          <h3>TAT vs No. of Disalinks</h3>
        </CardTitle>
      </Header>
      <Body>
        <Line data={data} height={270} options={options} />
      </Body>
    </Container>
  );
}
