import React from 'react';

import { Bar } from "react-chartjs-2";
import "chartjs-plugin-style";
import { ThemeContext } from "styled-components";
import "chartjs-plugin-datalabels";

import { Container } from "./styles";

function MixedChart({ dataChart, labels, onClick }) {
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
            yAxes: [{   
                gridLines: 0,
                id: 'A',
                type: 'linear',
                position: 'left',
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
            {
                id: 'B',
                type: 'linear',
                position: 'right',
                ticks: {
                  max: 50,
                  min: 0
                },
                gridLines: 0,
                gridLines: {
                    zeroLineColor: "transparent",
                    drawBorder: false,
                    drawTicks: false,
                    display: false,
                    lineWidth: 0,
                },
            }],
            xAxes: [
            {
                stacked: true,
                display: 1,
                gridLines: 0,
                barPercentage: 1,
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


export default MixedChart;