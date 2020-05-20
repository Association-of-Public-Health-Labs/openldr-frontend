import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";

import { Container, MainPanel, Content } from "../../styles";

import { covid19 } from "../../../utils/menuConfig";

import SideBar from "../../../components/Menus/SideBar";
import Header from "../../../components/Menus/MenuHeader";
import Covid19ResultsTable from "../../../components/Covid19ResultsTable";

function Results() {
  return (
    <>
      <Container>
        <SideBar active="covid19results" menu={covid19} />
        <MainPanel>
          <Header page="Resultados" id="covid19results" menu={covid19} />
          <Content>
            <Covid19ResultsTable />
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}

export default Results;
