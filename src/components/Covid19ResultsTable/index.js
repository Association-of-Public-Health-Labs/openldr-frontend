import React, { useContext, useState } from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ThemeContext } from "styled-components";

import { FiEdit2 } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

import api from "../../services/api";

import { Container, UseStyles, Theme } from "./styles";

function Covid19ResultsTable() {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  const [state, setState] = useState({
    columns: [
      { title: "Nome", field: "FIRSTNAME" },
      { title: "Apelido", field: "SURNAME" },
      { title: "Idade", field: "AgeInYears" },
      { title: "Telefone", field: "MOBILE" },
      { title: "Provincia", field: "RequestingProvinceName" },
      { title: "Distrito", field: "RequestingDistrictName" },
      { title: "US", field: "RequestingFacilityName" },
      { title: "Data de Colheita", field: "SpecimenDatetime" },
      { title: "Data de Analise", field: "AnalysisDatetime" },
    ],

    data: [
      {
        name: "Mehmet",
        surname: "Baran",
        age: 12,
        phone: "844634529",
        province: "Maputo Provincia",
        district: "Matola",
        facility: "CS de Ndlavela",
        specimenDate: "2020-05-01",
        analysisDate: "2020-05-02",
      },
      {
        name: "Ana",
        surname: "Francisco",
        age: 12,
        phone: "844634529",
        province: "Maputo Provincia",
        district: "Matola",
        facility: "CS de Ndlavela",
        specimenDate: "2020-05-01",
        analysisDate: "2020-05-02",
      },
      {
        name: "Joseph",
        surname: "Cabila",
        age: 12,
        phone: "844634529",
        province: "Maputo Provincia",
        district: "Matola",
        facility: "CS de Ndlavela",
        specimenDate: "2020-05-01",
        analysisDate: "2020-05-02",
      },
      {
        name: "John",
        surname: "Khenedy",
        age: 12,
        phone: "844634529",
        province: "Maputo Provincia",
        district: "Matola",
        facility: "CS de Ndlavela",
        specimenDate: "2020-05-01",
        analysisDate: "2020-05-02",
      },
      {
        name: "Niel",
        surname: "Armstrong",
        age: 12,
        phone: "844634529",
        province: "Maputo Provincia",
        district: "Matola",
        facility: "CS de Ndlavela",
        specimenDate: "2020-05-01",
        analysisDate: "2020-05-02",
      },
    ],
  });

  function handleChangePage(page) {
    alert(page);
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title="Registos de Covid19"
        columns={[
          { title: "Nome", field: "FIRSTNAME" },
          { title: "Apelido", field: "SURNAME" },
          { title: "Idade", field: "AgeInYears" },
          { title: "Telefone", field: "MOBILE" },
          { title: "Provincia", field: "RequestingProvinceName" },
          { title: "Distrito", field: "RequestingDistrictName" },
          { title: "US", field: "RequestingFacilityName" },
          { title: "Data de Colheita", field: "SpecimenDatetime" },
          { title: "Data de Analise", field: "AnalysisDatetime" },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            api
              .get(`/paginate/${query.page + 1}/${query.pageSize}`)
              .then((result) => {
                const { data } = result;
                resolve({
                  data: data.docs,
                  page: data.page - 1,
                  totalCount: data.total,
                });
              });
          })
        }
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          exportButton: true,
          rowStyle: {
            borderBottomColor: "#F4F4F4",
            borderBottomWidth: 6,
            borderBottomStyle: "solid",
          },
          headerStyle: {
            borderBottomColor: "#F4F4F4",
            borderBottomWidth: 6,
            borderBottomStyle: "solid",
          },
          searchFieldStyle: {
            backgroundColor: "#F4F4F4",
            borderRadius: 8,
            padding: 8,
            borderBottomWidth: 0,
            borderBottomColor: "white",
          },
        }}
      />
    </ThemeProvider>
  );
}

export default Covid19ResultsTable;
