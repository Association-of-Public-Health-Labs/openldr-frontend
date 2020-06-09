import React, { useContext, useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ThemeContext } from "styled-components";

import { FiEdit2 } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

import api from "../../services/api";

import { Container, UseStyles, Theme } from "./styles";
import PatientDataPopup from "../PatientDataPopup";

function Covid19ResultsTable({ dates }) {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);
  const [showPopup, setShowPopup] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    function loadDates() {
      setStartDate(dates.start);
      setEndDate(dates.end);
    }
    loadDates();
  }, [dates]);

  return (
    <>
      {showPopup && (
        <PatientDataPopup
          patient={patientData}
          handleClosePopup={handleClosePopup}
        />
      )}
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Registos de Covid19"
          columns={[
            { title: "Codigo", field: "RequestID", hidden: true },
            { title: "Nome", field: "FIRSTNAME" },
            { title: "Apelido", field: "SURNAME" },
            { title: "Idade", field: "AgeInYears" },
            { title: "Telefone", field: "MOBILE" },
            { title: "Genero", field: "Hl7SexCode" },
            { title: "Provincia", field: "RequestingProvinceName" },
            { title: "Distrito", field: "RequestingDistrictName" },
            { title: "US", field: "RequestingFacilityName" },
            { title: "Data de Colheita", field: "SpecimenDatetime" },
            { title: "Data de Recepcao", field: "AnalysisDatetime" },
            {
              title: "Data de Registo",
              field: "RegisteredDatetime",
              hidden: true,
            },
            {
              title: "Data de Analise",
              field: "AnalysisDatetime",
              hidden: true,
            },
            {
              title: "Data de Validacao",
              field: "AuthorisedDatetime",
              hidden: true,
            },
            {
              title: "Resultado",
              field: "Covid19Result",
            },
          ]}
          style={{
            backgroundColor: colors.background.secondary,
            color: colors.text,
          }}
          onRowClick={(event, rowData, togglePanel) => {
            setShowPopup(true);
            setPatientData(rowData);
          }}
          data={(query) =>
            new Promise((resolve, reject) => {
              const jwt_token = localStorage.getItem("@RAuth:token");
              api
                .get(
                  `/paginate/${query.page + 1}/${
                    query.pageSize
                  }/${startDate}/${endDate}`,
                  {
                    headers: {
                      authorization: `Bearer ${jwt_token}`,
                    },
                  }
                )
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
    </>
  );
}

export default Covid19ResultsTable;
