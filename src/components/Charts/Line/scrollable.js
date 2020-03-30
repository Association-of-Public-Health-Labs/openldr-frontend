import React, { useEffect } from "react";
import { Bar, Line, Chart } from "react-chartjs-2";
import "chartjs-plugin-style";
import hexToRgba from "hex-to-rgba";
import SimpleBarReact from "simplebar-react";

import "simplebar/src/simplebar.css";

import { Container } from "./styles";

export default function scrollable({ labels, datasets }) {
  function legendClickCallback(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    while (target.nodeName !== "LI") {
      target = target.parentElement;
    }
    var parent = target.parentElement;
    var chartId = parseInt(parent.classList[0].split("-")[0], 10);
    var chart = Chart.instances[chartId];
    var index = Array.prototype.slice.call(parent.children).indexOf(target);
    var item = chart.getDatasetMeta(index);

    if (item.hidden === null || item.hidden === false) {
      item.hidden = true;
      target.classList.add("hidden");
    } else {
      item.hidden = null;
      target.classList.remove("hidden");
    }

    chart.update();
  }

  var rectangleSet = false;

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
          borderColor: "#00b000",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#00b000",
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
          data: [
            66,
            93,
            31,
            76,
            39,
            75,
            36,
            45,
            66,
            93,
            31,
            76,
            39,
            75,
            36,
            45,
            66,
            93,
            31,
            76,
            39,
            75,
            36,
            45,
            66,
            93,
            31,
            76,
            39,
            75,
            36,
            45
          ]
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    responsive: false,
    tooltips: {
      titleFontSize: 0,
      titleMarginBottom: 0,
      bodyFontSize: 12
    },
    scales: {
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
      ],
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
    animation: {
      onComplete: function() {
        if (!rectangleSet) {
          var scale = window.devicePixelRatio;

          var sourceCanvas = this.chart.canvas;
          var copyWidth = this.scales["y-axis-0"].width - 10;
          var copyHeight =
            this.scales["y-axis-0"].height + this.scales["y-axis-0"].top + 10;

          var targetCtx = document.getElementById("axis-Test").getContext("2d");

          targetCtx.scale(scale, scale);
          targetCtx.canvas.width = copyWidth * scale;
          targetCtx.canvas.height = copyHeight * scale;

          targetCtx.canvas.style.width = `${copyWidth}px`;
          targetCtx.canvas.style.height = `${copyHeight}px`;
          targetCtx.drawImage(
            sourceCanvas,
            0,
            0,
            copyWidth * scale,
            copyHeight * scale,
            0,
            0,
            copyWidth * scale,
            copyHeight * scale
          );

          var sourceCtx = sourceCanvas.getContext("2d");
          sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
          rectangleSet = true;
        }

        var myLegendContainer = document.getElementById("legend");
        // generate HTML legend
        myLegendContainer.innerHTML = this.generateLegend();
        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName("li");
        for (var i = 0; i < legendItems.length; i += 1) {
          legendItems[i].addEventListener("click", legendClickCallback, false);
        }
      },
      onProgress: function() {
        if (rectangleSet === true) {
          var copyWidth = this.scales["y-axis-0"].width;
          var copyHeight =
            this.scales["y-axis-0"].height + this.scales["y-axis-0"].top + 10;

          var sourceCtx = this.chart.canvas.getContext("2d");
          sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
        }
      }
    }
  };

  return (
    <Container>
      <div id="chartWrapper">
        <SimpleBarReact
          direction="rtl"
          style={{ width: "100%", height: "100%" }}
        >
          <Line data={data} options={options} height={270} width={1200} />
        </SimpleBarReact>
        <canvas id="axis-Test" width="0"></canvas>
        <div id="legend"></div>
      </div>
    </Container>
  );
}
