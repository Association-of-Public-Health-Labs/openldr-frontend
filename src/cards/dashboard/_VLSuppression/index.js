import React, { useState, useContext } from "react";
import { FiActivity, FiBarChart } from "react-icons/fi";
import { IoMdGrid, IoIosExpand } from "react-icons/io";
import { ThemeContext } from "styled-components";

import { FaRegMap } from "react-icons/fa";

import ChartLine from "../../../components/Charts/ChartLine";
import Line from "../../../components/Charts/Line";
import Menu from "../../../components/Menus/CardMenu";
import FullMenu from "../../../components/Menus/CardFullMenu";
import DataTable from "../../../components/DataTable";
import EditButton from "../../../components/MaterialUI/EditButton";
import MainPopup from "../../../components/MainPopup";
import IconBtn from "../../../components/MaterialUI/IconBtn";

import { Container, Body, Content } from "./styles";
import { Header, CardMenu, CardTitle } from "../../styles";

export default function VlSuppression() {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useContext(ThemeContext);
  const [tab, setTab] = useState("chart");
  const [expand, setExpand] = useState(false);

  const labels = [
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
    "Dez"
  ];
  const data = {
    label: "Supressao Viral",
    color: colors.primary,
    data: [75, 60, 80, 72, 64, 68, 72, 71, 70, 68, 72, 71]
  };

  const rows = [data.data];

  function handleTab(e) {
    setTab(e.currentTarget.dataset.tab);
  }

  const handleMenu = event => {
    setIsOpen(!isOpen);
  };

  const handleExpandCard = event => {
    setExpand(!expand);
  };

  function createContent() {
    return (
      <>
        <Header>
          <CardTitle>
            <h5>Ultimos 12 meses</h5>
            <h3>Viral Suppression</h3>
          </CardTitle>
          <CardMenu>
            <button
              onClick={handleTab}
              className={
                tab === "table"
                  ? "card-menu-options active"
                  : "card-menu-options"
              }
              data-tab="table"
            >
              <IoMdGrid size={16} />
            </button>
            <button
              onClick={handleTab}
              className={
                tab === "chart"
                  ? "card-menu-options active"
                  : "card-menu-options"
              }
              data-tab="chart"
            >
              <FaRegMap size={16} />
            </button>
            <EditButton openMenu={handleMenu} />
            <IconBtn
              event={handleExpandCard}
              icon={<IoIosExpand size={16} />}
            />
          </CardMenu>
        </Header>
        <Body>
          {tab === "chart" ? (
            <Line labels={labels} datasets={data} />
          ) : (
            <DataTable header={labels} rows={rows} />
          )}
        </Body>
      </>
    );
  }

  return (
    <Container>
      {isOpen && <FullMenu handleCloseMenu={handleMenu} />}
      <Content isExpanded={expand}>{createContent()}</Content>
      {expand && <MainPopup content={createContent()} />}
    </Container>
  );
}
