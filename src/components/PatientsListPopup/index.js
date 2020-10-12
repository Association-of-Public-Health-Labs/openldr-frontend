import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { FiX } from "react-icons/fi";

import Menu from "../../components/Menus/CardFullMenu";
import IconBtn from "../../components/MaterialUI/IconBtn";

import { Container, Popup, Header, Title, CardTitle } from "./styles";

const columns = [
    {id: 'RequestID', label: "Código da Amostra", minWidth: 170},
    {id: "NID", label: 'NID'},
    { id: 'FIRSTNAME', label: 'Nome', minWidth: 170 },
    { id: 'SURNAME', label: 'Apelido', minWidth: 100 },
    { id: 'AgeInYears', label: 'Idade', minWidth: 100 },
    { id: 'Hl7SexCode', label: 'Genero', minWidth: 100 },
    { id: 'RequestingProvinceName', label: 'Provincia', minWidth: 100 },
    { id: 'RequestingDistrictName', label: 'Distrito', minWidth: 100 },
    { id: 'RequestingFacilityName', label: 'US', minWidth: 100 },
    { id: 'SpecimenDatetime', label: 'Dt. Colheita', minWidth: 100 },
    { id: 'AnalysisDatetime', label: 'Dt. Analise', minWidth: 100 },
    { id: 'ViralLoadResultCategory', label: 'Resultado', minWidth: 100 },
  ];
  
  function createData(RequestID,
    NID,
    FIRSTNAME,
    SURNAME,
    AgeInYears,
    Hl7SexCode,
    RequestingProvinceName,
    RequestingDistrictName,
    RequestingFacilityName,
    SpecimenDatetime,
    AnalysisDatetime,
    ViralLoadResultCategory) {
    return { RequestID,
        NID,
        FIRSTNAME,
        SURNAME,
        AgeInYears,
        Hl7SexCode,
        RequestingProvinceName,
        RequestingDistrictName,
        RequestingFacilityName,
        SpecimenDatetime,
        AnalysisDatetime,
        ViralLoadResultCategory };
  }
  
//   const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
//   ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    container: {
    //   height: '100%',
    },
  });

export default function PatientsListPopup({ location, data, dates, handleCloseMenu }) {
    const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    function loadRows(){
        setRows(...rows, data.map(record => createData(record.RequestID,
            record.NID,
            record.FIRSTNAME,
            record.SURNAME,
            record.AgeInYears,
            record.Hl7SexCode,
            record.RequestingProvinceName,
            record.RequestingDistrictName,
            record.RequestingFacilityName,
            record.SpecimenDatetime,
            record.AnalysisDatetime,
            record.ViralLoadResultCategory)))
    }
    loadRows()
  },[])



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Popup>
        <Header>
            <CardTitle>
                <h5>{`${dates[0]} - ${dates[1]}`}</h5>
                <h3>{location}</h3>
            </CardTitle>
            <IconBtn
                event={() => handleCloseMenu(false)}
                icon={<FiX size={18} />}
                color="normal"
              />
        </Header>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </Popup>
    </Container>
  );
}
