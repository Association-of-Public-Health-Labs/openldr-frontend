import React, { useContext, useState, useEffect } from "react";
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
        style={{
          backgroundColor: colors.background.secondary,
          color: colors.text,
        }}
        data={(query) =>
          new Promise((resolve, reject) => {
            const jwt_token = localStorage.getItem("@RAuth:token");
            api
              .get(`/paginate/${query.page + 1}/${query.pageSize}`, {
                headers: {
                  authorization: `Bearer ${jwt_token}`,
                },
              })
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
            borderBottomColor: colors.background.primary,
            borderBottomWidth: 6,
            borderBottomStyle: "solid",
            backgroundColor: colors.background.secondary,
            color: colors.text,
          },
          headerStyle: {
            borderBottomColor: colors.background.primary,
            borderBottomWidth: 6,
            borderBottomStyle: "solid",
            backgroundColor: colors.background.secondary,
            color: colors.text,
          },
          searchFieldStyle: {
            backgroundColor: colors.background.primary,
            borderRadius: 8,
            padding: 8,
            borderBottomWidth: 0,
            borderBottomColor: "white",
            color: colors.text,
          },
          actionsCellStyle: {
            color: colors.text,
          },
        }}
      />
    </ThemeProvider>
  );
}

export default Covid19ResultsTable;
