import React, { useState, useEffect, useContext } from "react";
import Context from "../../context";

import FullMenu from "../Menus/CardFullMenu";
import CardContextMenu from "../Menus/CardContextMenu";
import Header from "../CardHeader";
import MainPopup from "../MainPopup";
import MenuCard from "../Menus/CardMenu";
import CardLoader from "../CardLoader";

import {
  Container,
  Content,
  Footer,
  CardLabels,
  Label,
  AgeLabel,
} from "./styles";

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function Card({
  children,
  cardId,
  cardTitle,
  cardLabel,
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
  borderRadius,
  handleParams,
  isLoading,
  footerFacilitiesList,
  ageLabels,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);
  const [age, setAge] = useState(false);
  const [sampleType, setSampleType] = useState(false);
  const [expandCard, setExpandCard] = useState(false);

  const { handleAddReport, clinicsList, districtsList, labsList } = useContext(
    Context
  );

  const handleMenu = (event) => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
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
        chartLabels: chartLabels,
      },
    ]);
  };

  const handleExpandCard = () => {
    setExpandCard(!expandCard);
  };

  const handleGetParams = (params) => {
    handleParams(params);
  };

  const menus = {
    national: (
      <MenuCard
        borderRadius={borderRadius || "20px"}
        handleCloseMenu={handleMenu}
        handleGetParams={handleGetParams}
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
        handleGetParams={handleGetParams}
      />
    ),
  };

  function createContent() {
    return (
      <>
        <Header
          label={cardLabel || "Last 12 months"}
          title={cardTitle}
          editButtonEvent={() => setIsOpen(!isOpen)}
          isExpanded={expandCard}
          expandable={expandable}
          handleExpandCard={handleExpandCard}
        />
        <div id={cardId}>{children}</div>
        <Footer>
          {ageLabels && ageLabels.length > 0 && (
            <CardLabels>
              <p>Idade: </p>
              <AgeLabel>{ageLabels[0] + "-" + ageLabels[1]} anos</AgeLabel>
            </CardLabels>
          )}
          {footerFacilitiesList && footerFacilitiesList.length > 0 && (
            <CardLabels>
              {footerFacilitiesList.map((facility) => (
                <Label>{facility}</Label>
              ))}
            </CardLabels>
          )}
        </Footer>
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
        districtsList: districtsList,
        labsList: labsList,
      }}
    >
      <Container
        onContextMenu={handleClick}
        borderRadius={borderRadius || "20px"}
        height={height || "auto"}
      >
        {isLoading && <CardLoader />}
        {isOpen && menus[menuType]}
        <Content isExpanded={expandCard}>{createContent()}</Content>
        <CardContextMenu state={state} handleClose={handleClose} />
        {expandCard && <MainPopup lab={isLab} content={createContent()} />}
      </Container>
    </Context.Provider>
  );
}
