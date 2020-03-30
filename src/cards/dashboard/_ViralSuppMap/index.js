import React, { useEffect, useState, useContext } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { FiActivity, FiBarChart } from "react-icons/fi";
import { IoMdGrid, IoIosGrid } from "react-icons/io";
import { ThemeContext } from "styled-components";

import { FaRegMap } from "react-icons/fa";

import Menu from "../../../components/Menus/CardMenu";
import DataTable from "../../../components/DataTable";
import EditButton from "../../../components/MaterialUI/EditButton";

import Map from "../../../components/Charts/Map";

import { Container, MapSvg, AverageText } from "./styles";
import { Header, CardMenu, CardTitle } from "../../styles";

const header = ["Provincia", "Suppressao Viral"];

const rows = [
  ["Cabo Delgado", 15],
  ["Niassa", 15],
  ["Nampula", 15],
  ["Zambezia", 15],
  ["Tete", 15],
  ["Sofala", 15],
  ["Manica", 15],
  ["Inhambane", 15],
  ["Gaza", 15],
  ["Maputo Provincia", 15],
  ["Maputo Cidade", 15]
];
export default function ViralSuppMap() {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useContext(ThemeContext);
  const [tab, setTab] = useState("map");

  function handleTab(e) {
    setTab(e.currentTarget.dataset.tab);
  }

  const handleMenu = event => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    tippy("#inhambane", {
      content:
        "<strong>Inhambane</strong><br/><span>VL Suppresion rate: 79%</span><br/><span>Routine: 68%</span><br/><span>Treatment Failure: 15%</span>",
      allowHTML: true,
      distance: 0,
      delay: 300,
      theme: "tooltip"
    });
  }, []);

  return (
    <Container>
      {isOpen && <Menu handleCloseMenu={handleMenu} />}
      <Header>
        <CardTitle>
          <h5>Ultimos 12 meses</h5>
          <h3>Viral Suppression</h3>
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
              tab === "map" ? "card-menu-options active" : "card-menu-options"
            }
            data-tab="map"
          >
            <FaRegMap size={16} />
          </button>
          <EditButton openMenu={handleMenu} />
        </CardMenu>
      </Header>
      {tab === "map" ? <Map /> : <DataTable header={header} rows={rows} />}
    </Container>
  );
}
