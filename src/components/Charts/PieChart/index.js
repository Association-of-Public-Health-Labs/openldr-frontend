import React from "react";
import { Pie } from "react-chartjs-2";
import hexToRgba from "hex-to-rgba";

import { Container } from "./styles";

export default function PieChart({ labels, datasets }) {
  const data = canvas => {
    const ctx = canvas.getContext("2d");

    var gradientFill1 = ctx.createLinearGradient(0, 176, 0, 50);
    gradientFill1.addColorStop(0, hexToRgba("#66bb6a", "0.6"));
    gradientFill1.addColorStop(1, hexToRgba("#00b000", "1"));

    var gradientFill2 = ctx.createLinearGradient(0, 176, 0, 50);
    gradientFill2.addColorStop(0, hexToRgba("#fb8c00", "1"));
    gradientFill2.addColorStop(1, hexToRgba("#ffa726", "1"));

    var gradientFill3 = ctx.createLinearGradient(0, 176, 0, 50);
    gradientFill3.addColorStop(0, hexToRgba("#ef5350", "1"));
    gradientFill3.addColorStop(1, hexToRgba("#e74c3c", "1"));

    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: [
            gradientFill1,
            gradientFill2,
            gradientFill3,
            "#9b59b6",
            "#f1c40f",
            "#e74c3c",
            "#34495e"
          ],
          data: datasets
        }
      ]
    };
  };

  const options = {
    responive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom"
    }
  };
  return (
    <Container>
      <Pie data={data} height={270} options={options} />
    </Container>
  );
}
