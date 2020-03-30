import React, { useState, useContext } from "react";
import { ThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ThemeContext } from "styled-components";

import { FiEdit2 } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

import MenuCard from "../../../components/Menus/CardMenu";
import DataTable from "../../../components/DataTable";
import Card from "../../../components/MainCard";

const header = [
  "Indicadores",
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
  "Jan"
];

const rows = [
  [
    "Amostras Rejeitadas",
    262,
    16.0,
    24,
    6.0,
    262,
    16.0,
    24,
    6.0,
    262,
    16.0,
    24,
    24,
    6.0
  ],
  [
    "Amostras Validadas",
    305,
    3.7,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3
  ],
  [
    "Suppressao Viral",
    356,
    16.0,
    16.0,
    49,
    3.9,
    305,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3
  ],
  [
    "Taxa de Rejeicao",
    356,
    16.0,
    16.0,
    49,
    3.9,
    305,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3
  ],
  [
    "Taxa de Rejeicao",
    356,
    16.0,
    16.0,
    49,
    3.9,
    305,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3
  ],
  [
    "Taxa de Rejeicao",
    356,
    16.0,
    49,
    3.9,
    305,
    3.7,
    67,
    4.3,
    305,
    3.7,
    67,
    4.3,
    4.3
  ]
];

export default function Indicators() {
  const cardId = "dash-samples-history";
  const cardTitle = "Resumo de Indicadores";

  return (
    <Card
      cardId={cardId}
      cardTitle={cardTitle}
      excelData={rows}
      excelLabels={header}
      chartData={rows}
      chartLabels={header}
      menuType="national"
      borderRadius="4px"
    />
  );
}
