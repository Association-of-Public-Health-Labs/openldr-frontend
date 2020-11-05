import React, {useContext} from 'react';
import MaterialTable from "material-table";
import { ThemeProvider } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { ThemeContext } from "styled-components";

import { FiX } from "react-icons/fi";
import IconBtn from "../MaterialUI/IconBtn";

import { Container, Popup, Header, CardTitle, Theme, UseStyles } from "./styles";

import api from "../../services/api";

const columns = [
    // { field: "RequestID", title: "Codigo da Amostra" }, 
    { field: "FIRSTNAME", title: "Nome" },
    { field: "SURNAME", title: "Apelido" },
    { field: "AgeInYears", title: "Idade" },
    { field: "Hl7SexCode", title: "Sexo" },
    { field: "MOBILE", title: "Contacto" },
    { field: "RequestingProvinceName", title: "Provincia" },
    { field: "RequestingDistrictName", title: "Distrito" },
    { field: "RequestingFacilityName", title: "US" },
    { field: "SpecimenDatetime", title: "Data de Colheita" },
    { field: "AnalysisDatetime", title: "Data de Analise" },
    { field: "ViralLoadResultCategory", title: "Resultado" },
]

export default function PatientsListPopup({location,dates, query, handleClosePopup}) {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const theme = Theme(colors);

  return (
    <Container>
        <Popup>
            <Header>
                <CardTitle>
                    {/* <h4>{location}</h4>
                    <h5>ndkrfl;sf'f'f</h5> */}
                </CardTitle>
                <IconBtn
                event={() => handleClosePopup(false)}
                icon={<FiX size={18} />}
                color="normal"
              />
            </Header>
            <MaterialTable
                title={location}
                columns={columns}
                style={{
                    backgroundColor: colors.background.secondary,
                    color: colors.text,
                }}
                data={(query_details) =>
                    new Promise((resolve, reject) => {
                    const jwt_token = localStorage.getItem("@RAuth:token");
                    console.log(`/viralload/results/query/${query_details.page + 1}/${
                        query_details.pageSize
                    }/${query}`)
                    api
                        .get(
                        `/viralload/results/query/${query_details.page + 1}/${
                            query_details.pageSize
                        }/${query}`,
                        //   {
                        //     headers: {
                        //       authorization: `Bearer ${jwt_token}`,
                        //     },
                        //   }
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
                    search: false
                }}
                />
        </Popup>
    </Container>
  )
}