import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import { IoMdGrid } from "react-icons/io";
import { FaRegMap } from "react-icons/fa";

import Chart from "../../../components/Charts/ChartBarStacked";
import EditButton from "../../../components/MaterialUI/EditButton";
import Menu from "../../../components/Menus/CardMenu";
import DataTable from "../../../components/DataTable";

import { Container, Body } from "./styles";
import { Header, CardMenu, CardTitle } from "../../styles";

export default function TurnaroundTime() {
  const { colors } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("chart");

  const labels = [
    "Jan,",
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
    "Dez"
  ];
  const data = [
    {
      label: "Colheita à Recepção",
      backgroundColor: "#fb8c00",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Recepção ao Registo",
      backgroundColor: "#ef5350",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Registo à Análise",
      backgroundColor: "#00000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    },
    {
      label: "Análise à Validação",
      backgroundColor: "#00b000",
      data: [10, 12, 11, 9, 8, 10, 12, 14, 21, 29, 15, 10]
    }
  ];

  const rows = [data[0].data, data[1].data, data[2].data, data[3].data];

  function handleTab(e) {
    setTab(e.currentTarget.dataset.tab);
  }

  const handleMenu = event => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {isOpen && <Menu handleCloseMenu={handleMenu} />}
      <Header>
        <CardTitle>
          <h5>Ultimos 12 meses</h5>
          <h3>Turn around time</h3>
        </CardTitle>
        <CardMenu>
          <button
            onClick={handleTab}
            className={
              tab === "table" ? "card-menu-options active" : "card-menu-options"
            }
            data-tab="table"
          >
            <IoMdGrid size={16} />
          </button>
          <button
            onClick={handleTab}
            className={
              tab === "chart" ? "card-menu-options active" : "card-menu-options"
            }
            data-tab="chart"
          >
            <FaRegMap size={16} />
          </button>
          <EditButton openMenu={handleMenu} />
        </CardMenu>
      </Header>
      <Body>
        {tab === "chart" ? (
          <Chart dataChart={data} labels={labels} />
        ) : (
          <DataTable header={labels} rows={rows} />
        )}
      </Body>
    </Container>
  );
}
