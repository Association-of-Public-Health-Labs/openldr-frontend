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
            {
              title: "Pat_NATIONALITY",
              field: "Pat_NATIONALITY",
              hidden: true,
            },
            { title: "NATIONALID", field: "NATIONALID", hidden: true },
            { title: "UNIQUEID", field: "UNIQUEID", hidden: true },
            { title: "TELHOME", field: "TELHOME", hidden: true },
            { title: "TELWORK", field: "TELWORK", hidden: true },
            { title: "MOBILE", field: "MOBILE", hidden: true },
            { title: "EMAIL", field: "EMAIL", hidden: true },
            { title: "DOB", field: "DOB", hidden: true },
            {
              title: "LIMSRejectionCode",
              field: "LIMSRejectionCode",
              hidden: true,
            },
            {
              title: "LIMSRejectionDesc",
              field: "LIMSRejectionDesc",
              hidden: true,
            },
            {
              title: "HistoryOfSomeDisease",
              field: "HistoryOfSomeDisease",
              hidden: true,
            },
            { title: "ArrivalTime", field: "ArrivalTime", hidden: true },
            { title: "Contact14Days", field: "Contact14Days", hidden: true },
            { title: "ContactDate1", field: "ContactDate1", hidden: true },
            { title: "ContactDate2", field: "ContactDate2", hidden: true },
            { title: "DestinyCountry", field: "DestinyCountry", hidden: true },
            {
              title: "LengthOfStayInMoz",
              field: "LengthOfStayInMoz",
              hidden: true,
            },
            { title: "EntryPointName", field: "EntryPointName", hidden: true },
            {
              title: "PlaceOfResidenceInMoz",
              field: "PlaceOfResidenceInMoz",
              hidden: true,
            },
            { title: "WaitingPoint", field: "WaitingPoint", hidden: true },
            { title: "Workplace", field: "Workplace", hidden: true },
            {
              title: "MeansOfTransport",
              field: "MeansOfTransport",
              hidden: true,
            },
            { title: "Nationality", field: "Nationality", hidden: true },
            {
              title: "NotificationDate",
              field: "NotificationDate",
              hidden: true,
            },
            { title: "Number", field: "Number", hidden: true },
            {
              title: "NumberOfCompanions",
              field: "NumberOfCompanions",
              hidden: true,
            },
            { title: "Coryza", field: "Coryza", hidden: true },
            { title: "Country1", field: "Country1", hidden: true },
            { title: "Country2", field: "Country2", hidden: true },
            {
              title: "PartcpCeremonies",
              field: "PartcpCeremonies",
              hidden: true,
            },
            { title: "DepartureDate", field: "DepartureDate", hidden: true },
            {
              title: "CountryOfOrigin",
              field: "CountryOfOrigin",
              hidden: true,
            },
            { title: "ContactPerson", field: "ContactPerson", hidden: true },
            { title: "Provenance", field: "Provenance", hidden: true },
            {
              title: "ReasonForTripToMoz",
              field: "ReasonForTripToMoz",
              hidden: true,
            },
            {
              title: "ContactPersonsPhone",
              field: "ContactPersonsPhone",
              hidden: true,
            },
            { title: "Telephone", field: "Telephone", hidden: true },
            { title: "Traveler", field: "Traveler", hidden: true },
            {
              title: "SymptomStartDate",
              field: "SymptomStartDate",
              hidden: true,
            },
            { title: "Diarrhea", field: "Diarrhea", hidden: true },
            { title: "JoinPain", field: "JoinPain", hidden: true },
            { title: "Headaches", field: "Headaches", hidden: true },
            { title: "MuscleAches", field: "MuscleAches", hidden: true },
            {
              title: "DurationOfSymptoms",
              field: "DurationOfSymptoms",
              hidden: true,
            },
            {
              title: "ShortnessOfBreath",
              field: "ShortnessOfBreath",
              hidden: true,
            },
            { title: "Fever", field: "Fever", hidden: true },
            {
              title: "GeneralWeakness",
              field: "GeneralWeakness",
              hidden: true,
            },
            { title: "Nausea", field: "Nausea", hidden: true },
            { title: "Symptoms", field: "Symptoms", hidden: true },
            { title: "Remarks", field: "Remarks", hidden: true },
            { title: "Vomit", field: "Vomit", hidden: true },
            { title: "ResultsRemarks", field: "ResultsRemarks", hidden: true },
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
                  // console.log(data);
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
