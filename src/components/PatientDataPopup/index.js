import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import lottie from "lottie-web";
import crying_emoji from "../../assets/lottie/crying-emoji.json";
import smiley_emoji from "../../assets/lottie/smiley-emoji.json";
import IconBtn from "../MaterialUI/IconBtn";
import { IoIosClose } from "react-icons/io";
import { ThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { FiX } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Covid19Report from "../pdfReports/Covid19Report";

import {
  Container,
  Popup,
  Header,
  Body,
  ResultPanel,
  Emoji,
  PatientDataList,
  Footer,
  LaudoPanel,
} from "./styles";

export const UseStyles = makeStyles({
  datePicker: {
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "4px",
    borderBottomColor: "#ffffff",
  },
  margin: {
    margin: "10px",
    color: "white",
  },
  iconButton: {
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function PatientDataPopup({ patient, handleClosePopup }) {
  const element = useRef(null);
  const classes = UseStyles();
  const [isLaudoEnabled, setIsLaudoEnabled] = useState(false);

  useEffect(() => {
    if (element.current)
      // add this
      lottie.loadAnimation({
        animationData:
          patient.Covid19Result === "Positivo"
            ? crying_emoji
            : patient.Covid19Result === "Negativo"
            ? smiley_emoji
            : null,
        container: element.current,
        loop: true,
      });
  }, [element]);

  return (
    <Container>
      <Popup isLaudoEnabled={isLaudoEnabled}>
        <Header>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <h5 className="title">Nome do Paciente</h5>
              <h3>{patient.FIRSTNAME + " " + patient.SURNAME}</h3>
            </Grid>
            <Grid item xs={4}>
              <h5 className="title">Codico da Amostra</h5>
              <h3>{patient.RequestID}</h3>
            </Grid>
            <Grid item xs={4}>
              <ResultPanel>
                <div className="left">
                  <h5 className="title">Resultado</h5>
                  <h3>{patient.Covid19Result}</h3>
                </div>
                <Emoji ref={element} />
              </ResultPanel>
            </Grid>
          </Grid>
          <div>
            <IconButton
              className={classes.iconButton}
              size="medium"
              aria-label="close"
              color="default"
              onClick={handleClosePopup}
            >
              <FiX size={16} />
            </IconButton>
          </div>
        </Header>
        <Body>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <PatientDataList>
                <tbody>
                  <tr>
                    <td className="list-label">
                      <h5>Gênero</h5>
                    </td>
                    <td className="list-value">{patient.Hl7SexCode}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Idade</h5>
                    </td>
                    <td className="list-value">{patient.AgeInYears}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Telefone</h5>
                    </td>
                    <td className="list-value">{patient.MOBILE}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Província</h5>
                    </td>
                    <td className="list-value">
                      {patient.RequestingProvinceName}
                    </td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Distrito</h5>
                    </td>
                    <td className="list-value">
                      {patient.RequestingDistrictName}
                    </td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Unidade Sanitária</h5>
                    </td>
                    <td className="list-value">
                      {patient.RequestingFacilityName}
                    </td>
                  </tr>
                </tbody>
              </PatientDataList>
            </Grid>
            <Grid item xs={6}>
              <PatientDataList>
                <tbody>
                  <tr>
                    <td className="list-label">
                      <h5>Data de Colheita</h5>
                    </td>
                    <td className="list-value">{patient.SpecimenDatetime}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Data de Recepção no Lab</h5>
                    </td>
                    <td className="list-value">{patient.ReceivedDatetime}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Data de Registo no Lab</h5>
                    </td>
                    <td className="list-value">{patient.RegisteredDatetime}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Data de Análise</h5>
                    </td>
                    <td className="list-value">{patient.AnalysisDatetime}</td>
                  </tr>
                  <tr>
                    <td className="list-label">
                      <h5>Data de Validação</h5>
                    </td>
                    <td className="list-value">{patient.AuthorisedDatetime}</td>
                  </tr>
                  {/* <tr>
                    <td className="list-label">Unidade Sanitaria</td>
                    <td className="list-value">
                      {patient.RequestingFacilityName}
                    </td>
                  </tr> */}
                </tbody>
              </PatientDataList>
            </Grid>
          </Grid>
        </Body>
        <Footer>
          <PDFDownloadLink
            document={<Covid19Report patientData={patient} />}
            fileName={`${patient?.RequestID}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "A carregar o documento..."
              ) : (
                <Button>Laudo Clínico</Button>
              )
            }
          </PDFDownloadLink>
        </Footer>
      </Popup>

      {isLaudoEnabled && (
        <LaudoPanel>
          <Covid19Report />
        </LaudoPanel>
      )}
    </Container>
  );
}
