import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import moment from "moment";

import { Container, MainPanel, Content } from "../../styles";

import { covid19 } from "../../../utils/menuConfig";

import SideBar from "../../../components/Menus/SideBar";
import Header from "../../../components/Menus/MenuHeader";
import Covid19ResultsTable from "../../../components/Covid19ResultsTable";

const startDate = moment().subtract(15, "day").format("YYYY-MM-DD");
const endDate = moment().format("YYYY-MM-DD");

function Results() {
  const [dates, setDates] = useState({ start: startDate, end: endDate });
  const handleOnSubmitDateRange = (dates) => {
    setDates(dates);
  };
  return (
    <>
      <Container>
        <SideBar active="covid19results" menu={covid19} />
        <MainPanel>
          <Header
            page="Resultados"
            id="covid19results"
            menu={covid19}
            dateRange={true}
            handleOnSubmitDateRange={handleOnSubmitDateRange}
          />
          <Content>
            <Covid19ResultsTable
              dates={{ start: dates.start, end: dates.end }}
            />
          </Content>
        </MainPanel>
      </Container>
    </>
  );
}

export default Results;
