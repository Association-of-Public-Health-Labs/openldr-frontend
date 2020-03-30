import React from "react";

import Card from "../../../components/MainCard";
import Bar from "../../../components/Charts/Bar";

export default function TATMonthly() {
  const cardId = "tat-by-lab";
  const cardTitle = "Turn around time by Lab";

  const labels = [
    "INS",
    "Machava",
    "Militar",
    "J. Macamo",
    "UEM",
    "Dream Mpt",
    "Carmelo",
    "Xai-Xai",
    "P. Gea",
    "Dream Beira",
    "Chimoio",
    "Tete",
    "Nampula",
    "Quelimane",
    "Pemba"
  ];
  const data = [
    {
      label: "Colheita à Recepção",
      backgroundColor: "#fb8c00",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10, 29, 15, 10]
    },
    {
      label: "Recepção ao Registo",
      backgroundColor: "#ef5350",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10, 10, 12, 11]
    },
    {
      label: "Registo à Análise",
      backgroundColor: "#00000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10, 11, 9, 8]
    },
    {
      label: "Análise à Validação",
      backgroundColor: "#00b000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10, 29, 15, 10]
    }
  ];

  const labelsExcel = [
    "Tempo de Resposta",
    "INS",
    "Machava",
    "Militar",
    "J. Macamo",
    "UEM",
    "Dream Mpt",
    "Carmelo",
    "Xai-Xai",
    "P. Gea",
    "Dream Beira",
    "Chimoio",
    "Tete",
    "Nampula",
    "Quelimane",
    "Pemba"
  ];

  const dataExcel = [
    [
      "Colheita à Recepção",
      10,
      12,
      11,
      9,
      8,
      10,
      12,
      14,
      21,
      29,
      15,
      10,
      29,
      15,
      10
    ],
    [
      "Recepção ao Registo",
      10,
      12,
      11,
      9,
      8,
      10,
      12,
      14,
      21,
      29,
      15,
      10,
      10,
      12,
      11
    ],
    [
      "Registo à Análise",
      10,
      12,
      11,
      9,
      8,
      10,
      12,
      14,
      21,
      29,
      15,
      10,
      11,
      9,
      8
    ],
    [
      "Análise à Validação",
      10,
      12,
      11,
      9,
      8,
      10,
      12,
      14,
      21,
      29,
      15,
      10,
      29,
      15,
      10
    ]
  ];

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={dataExcel}
      excelLabels={labelsExcel}
      chartData={data}
      chartLabels={labels}
      menuType="byFacility"
      isLab={true}
      expandable={false}
      menuFixed={false}
    />
  );
}
