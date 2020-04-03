import React, { useState, useEffect } from "react";
import Context from "../../context";
import Cards from "../../cards/index";

import FullMenu from "../Menus/CardFullMenu";
import CardContextMenu from "../Menus/CardContextMenu";
import Header from "../CardHeader";
import MainPopup from "../MainPopup";
import MenuCard from "../Menus/CardMenu";

import { Container, Content } from "./styles";

const initialState = {
  mouseX: null,
  mouseY: null
};

export default function MainCard({
  cardId,
  cardTitle,
  cardMenu,
  excelLabels,
  excelData,
  chartData,
  chartLabels,
  menuType,
  isLab,
  expandable,
  menuFixed,
  height,
  borderRadius
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const [age, setAge] = useState(false);
  const [sampleType, setSampleType] = useState(false);
  const [expandCard, setExpandCard] = useState(false);

  const { handleAddReport, clinicsList, districtsList } = React.useContext(
    Context
  );

  const { content } = Cards[cardId];

  const handleMenu = event => {
    setIsOpen(!isOpen);
  };

  const menus = {
    national: (
      <MenuCard
        borderRadius={borderRadius || "20px"}
        handleCloseMenu={handleMenu}
      />
    ),
    byFacility: (
      <FullMenu
        lab={isLab}
        age={age}
        fixed={menuFixed}
        sampleType={sampleType}
        borderRadius={borderRadius || "20px"}
        handleCloseMenu={handleMenu}
      />
    )
  };

  const handleClick = event => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleAddReportIntoFolder = () => {
    handleAddReport([
      {
        cardId: cardId,
        cardTitle: cardTitle,
        excelLabels: excelLabels,
        excelData: excelData,
        chartData: chartData,
        chartLabels: chartLabels
      }
    ]);
  };

  const handleExpandCard = () => {
    setExpandCard(!expandCard);
  };

  function createContent() {
    return (
      <>
        <Header
          label="Last 12 months"
          title={cardTitle}
          editButtonEvent={() => setIsOpen(!isOpen)}
          isExpanded={expandCard}
          expandable={expandable}
          handleExpandCard={handleExpandCard}
        />
        <div id={cardId}>{content(chartData, chartLabels)}</div>
      </>
    );
  }

  useEffect(() => {
    function checkOptions() {
      if (typeof cardMenu !== "undefined") {
        if (typeof cardMenu.age !== "undefined") {
          setAge(true);
        }
        if (typeof cardMenu.sampleType !== "undefined") {
          setSampleType(true);
        }
      } else {
        setAge(false);
        setSampleType(false);
      }
    }
    checkOptions();
  }, [cardMenu]);

  return (
    <Context.Provider
      value={{
        cardId: cardId,
        labels: excelLabels,
        data: excelData,
        cardTitle: cardTitle,
        handleAddReport: handleAddReportIntoFolder,
        clinicsList: clinicsList,
        districtsList: districtsList
      }}
    >
      <Container
        onContextMenu={handleClick}
        borderRadius={borderRadius || "20px"}
        height={height || "auto"}
      >
        {isOpen && menus[menuType]}

        <Content isExpanded={expandCard}>{createContent()}</Content>
        <CardContextMenu state={state} handleClose={handleClose} />
        {expandCard && <MainPopup lab={isLab} content={createContent()} />}
      </Container>
    </Context.Provider>
  );
}
