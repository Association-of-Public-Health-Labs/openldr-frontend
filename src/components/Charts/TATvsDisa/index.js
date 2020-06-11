import React, { useContext } from "react";
import { Chart, Line } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import "chartjs-plugin-datalabels";

export default function TATvsDisa({ labels, dataset }) {
  const { colors } = useContext(ThemeContext);
  const data = (canvas) => {
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
      labels: labels,
      datasets: [
        {
          label: "TAT",
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
          data: dataset[0],
        },
        {
          label: "#Disalinks",
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
          data: dataset[1],
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      bodySpacing: 4,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10,
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: 0,
          ticks: {
            display: false,
            fontColor: "#cccccc",
            padding: 0,
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
          display: 1,
          gridLines: 0,
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
    plugins: {
      datalabels: {
        display: true,
        color: "grey",
        align: "top",
      },
    },
  };

  return <Line data={data} height={270} options={options} />;
}
