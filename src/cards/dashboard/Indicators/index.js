import React, { useState, useContext } from "react";
import { ThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ThemeContext } from "styled-components";

import { FiEdit2 } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

import MenuCard from "../../../components/Menus/CardMenu";
import DataTable from "../../../components/DataTable";

import { Container, Header, Title, CardMenu, Theme } from "./styles";

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
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu(status) {
    setIsOpen(status);
  }

  const handleCloseMenu = status => {
    setIsOpen(status);
  };

  return (
    <Container>
      {isOpen && <MenuCard handleCloseMenu={handleCloseMenu} />}
      <Header>
        <Title>Resumo de Indicadores</Title>
        <CardMenu>
          <ThemeProvider theme={theme}>
            <IconButton
              size="medium"
              aria-label="delete"
              color="default"
              onClick={() => handleOpenMenu(true)}
            >
              <FiEdit2 size={16} />
            </IconButton>
            <IconButton size="medium" aria-label="delete" color="normal">
              <IoMdMore size={20} />
            </IconButton>
          </ThemeProvider>
        </CardMenu>
      </Header>
      <DataTable header={header} rows={rows} />
    </Container>
  );
}
