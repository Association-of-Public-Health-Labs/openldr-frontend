import React, {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom"
import moment from "moment";

import api from "../../../services/api";

import {
    Container, 
    Header,
    Title, 
    Subtitle, 
    Flex, 
    Emblema, 
    Body, 
    Row,
    Footer
} from "./styles"

import emblema from "../../../assets/imgs/emblema.png";
import { useStaticState } from "@material-ui/pickers";


function QrResult() {
    const location = useLocation();
    const [search, setSearch] = useState(location?.search)
    const [result, setResult] = useState(null)
    const [datediff, setDatediff] = useState(null)
    const { id } = useParams();
    // const pathname = window.location.pathname
    

    // console.log(location)

    useEffect(() => {
        async function loadResult(){
            const id = search.substr(1,10)

            const response = await api.get(`/covid/results/${id}`);

            setResult(response?.data)

            console.log(response?.data)

            var todayDate = moment();
            var endDate = moment(response?.data?.AuthorisedDatetime);
            setDatediff(todayDate.diff(endDate, "days"));
            
        }
        loadResult()
    },[search])

    return (
        <Container>
            <Header>
                <Emblema src={emblema}/>
                <Flex>
                    <Title>Ministerio da Saude</Title>
                    <Subtitle>Direcao Nacional de Assistencia Medica</Subtitle>
                </Flex>
            </Header>
            {result &&
            <>
                <Body>
                        <Row>
                            <span>Nome Completo</span>
                            <span><strong>{result?.firstname+' '+result?.surname}</strong></span>
                        </Row>
                        <Row>
                            <span>Sexo</span>
                            <span>{result?.gender}</span>
                        </Row>
                        <Row>
                            <span>Idade</span>
                            <span>{result?.age}</span>
                        </Row>
                        <Row>
                            <span>Laboratorio de Teste</span>
                            <span>{result?.clinic}</span>
                        </Row>
                        <Row>
                            <span>Data de Analise</span>
                            <span>{moment(result?.AuthorisedDatetime).format("DD/MM/YYYY")}</span>
                        </Row>
                </Body>
                <Footer>
                {(result?.Covid19Result.includes("Negativo") && datediff <= 14) ?
                    <h3><strong>Teste Valido</strong></h3>
                    :<h3 style={{color: "red"}}><strong>Teste Invalido</strong></h3>
                }
                </Footer>
            </>
            }
        </Container>
    );
}

export default QrResult;
