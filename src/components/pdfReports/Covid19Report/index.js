import React, { createRef } from "react";
import Pdf from "react-to-pdf";
import moment from "moment";
import {
  Page,
  Image,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import { Container, Header, Title } from "./styles";

// import ins_logo from "https://www.ins.gov.mz/themes/zircon/logo.jpg";
import { FiAlignCenter, FiAlignRight } from "react-icons/fi";

function Covid19Report({ patientData }) {
  const ref = createRef();

  Font.register({
    family: "Calibri",
    fonts: [
      {
        src: "/calibri-bold.ttf",
        fontWeight: 700,
      }, // font-style: normal, font-weight: normal
    ],
  });

  return (
    // <PDFViewer style={styles.container}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <View style={styles.logo}> */}
          <Image style={styles.logo} src="/ins.jpg" />
          {/* </View> */}
          <Text style={styles.title}>
            NOTIFICAÇÃO DE RESULTADOS DE COVID-19
          </Text>
        </View>
        <View style={styles.formReport}>
          <Text style={styles.title}>Resultado Laborarorial</Text>
          <View style={styles.blockResult}>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.code}>{patientData?.RequestID}</Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Resultado:</Text>
                <Text style={styles.textResult}>
                  {patientData?.Covid19Result}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Data de Analise:</Text>
                <Text style={styles.textValue}>
                  {patientData?.AnalysisDatetime ? (
                    moment(patientData?.AnalysisDatetime).format("DD/MM/YYYY")
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>
                  Data de Validação do Resultado:
                </Text>
                <Text style={styles.textValue}>
                  {patientData?.AuthorisedDatetime ? (
                    moment(patientData?.AuthorisedDatetime).format("DD/MM/YYYY")
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Data de Colheita:</Text>
                <Text style={styles.textValue}>
                  {patientData?.SpecimenDatetime ? (
                    moment(patientData?.SpecimenDatetime).format("DD/MM/YYYY")
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Data de Registo no Lab:</Text>
                <Text style={styles.textValue}>
                  {patientData?.RegisteredDatetime ? (
                    moment(patientData?.RegisteredDatetime).format("DD/MM/YYYY")
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Data de Recepção:</Text>
                <Text style={styles.textValue}>
                  {patientData?.ReceivedDatetime ? (
                    moment(patientData?.ReceivedDatetime).format("DD/MM/YYYY")
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formReport}>
          <Text style={styles.title}>Dados Individuais</Text>
          <View style={styles.block}>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Provincia que notifica:</Text>
                <Text style={styles.textValue}>
                  {patientData?.RequestingProvinceName}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Sexo:</Text>
                <Text style={styles.textValue}>
                  {patientData?.HL7SexCode === "M"
                    ? "Masculino"
                    : patientData?.HL7SexCode === "F"
                    ? "Feminino"
                    : "Não especificado"}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Idade:</Text>
                <Text style={styles.textValue}>{patientData?.AgeInYears}</Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Nome do Caso:</Text>
                <Text style={styles.textValue}>
                  {patientData?.FIRSTNAME || patientData?.SURNAME ? (
                    `${patientData?.FIRSTNAME} ${patientData?.SURNAME}`
                  ) : (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>NID:</Text>
                <Text style={styles.textValue}>
                  {patientData?.UNIQUEID || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Nacionalidade:</Text>
                <Text style={styles.textValue}>
                  {patientData?.NATIONALITY || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Viajou nos ultimos 14 dias:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Contact14Days || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.formReport}>
          <Text style={styles.title}>Informação Clínica do Caso</Text>
          <View style={styles.block}>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Sintomas:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Symptoms || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Data de inicio de sintomas:</Text>
                <Text style={styles.textValue}>
                  {patientData?.SymptomStartDate || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockText}>
                <Text style={styles.label}>Duracao de Sintomas:</Text>
                <Text style={styles.textValue}>
                  {patientData?.DurationOfSymptoms || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Vacina BCG:</Text>
                <Text style={styles.textValue}>
                  <Text style={styles.notFilledText}>Não Preen.</Text>
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockText}>
                <Text style={styles.label}>Estado Clinico:</Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Febre:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Fever || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Dor muscular:</Text>
                <Text style={styles.textValue}>
                  {patientData?.MuscleAches || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Dor de garganta:</Text>
                <Text style={styles.textValue}>
                  {patientData?.MuscleAches || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Dor de cabeca:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Headaches || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Nauseas:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Nausea || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Vomitos:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Vomit || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Diarreia:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Diarrhea || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Coriza:</Text>
                <Text style={styles.textValue}>
                  {patientData?.Coryza || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRow}>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Fraqueza geral:</Text>
                <Text style={styles.textValue}>
                  {patientData?.GeneralWeakness || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Falta de ar:</Text>
                <Text style={styles.textValue}>
                  {patientData?.ShortnessOfBreath || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Tosse:</Text>
                <Text style={styles.textValue}>
                  {patientData?.ShortnessOfBreath || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Dor nas articulacoes:</Text>
                <Text style={styles.textValue}>
                  {patientData?.JoinPain || (
                    <Text style={styles.notFilledText}>Não Preen.</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.blockRowLeft}>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Perda de olfato:</Text>
                <Text style={styles.textValue}>
                  <Text style={styles.notFilledText}>Não Preen.</Text>
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Perda de paladar:</Text>
                <Text style={styles.textValue}>
                  <Text style={styles.notFilledText}>Não Preen.</Text>
                </Text>
              </View>
              <View style={styles.blockTextGrid}>
                <Text style={styles.label}>Outros sintomas:</Text>
                <Text style={styles.textValue}>
                  <Text style={styles.notFilledText}>Não Preen.</Text>
                </Text>
              </View>
              {/* <View style={styles.blockText}>
                  <Text style={styles.label}>Dor de cabeca:</Text>
                  <Text style={styles.textValue}>Sim</Text>
                </View> */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
}

export default Covid19Report;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    border: "none",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  logo: {
    width: 140,
    marginLeft: -20,
  },
  title: {
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: 700,
    fontFamily: "Calibri",
  },
  formReport: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 30,
  },
  block: {
    flexDirection: "column",
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    borderStyle: "solid",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  blockResult: {
    flexDirection: "column",
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#222",
    borderStyle: "solid",
    padding: 10,
    backgroundColor: "#F2F2F2",
  },
  blockText: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  blockTextGrid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "25%",
  },
  label: {
    fontSize: 10,
  },
  textValue: {
    fontSize: 10,
    fontWeight: 600,
    marginLeft: 5,
    fontFamily: "Calibri",
  },
  textResult: {
    fontSize: 12,
    fontWeight: "black",
    marginLeft: 10,
    fontFamily: "Calibri",
  },
  blockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  blockRowLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 10,
  },
  notFilledText: {
    fontSize: 11,
    fontWeight: 600,
    marginLeft: 5,
    fontFamily: "Calibri",
    color: "orange",
  },
  code: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "Calibri",
  },
});
