import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ThemeContext } from "styled-components";

import { FiEdit2 } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

import MenuCard from "../Menus/CardMenu";

import { Container, UseStyles, Theme } from "./styles";

export default function Covid19SamplesIndicatorsTable({ header, rows }) {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);

  const handleClick = (province) => {
    var win = window.open(`/samples/${province}`, "_blank");
    win.focus();
  };

  return (
    <Container>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((value) => (
                <TableCell className={classes.tableHeaderCell}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} className={classes.tableLastRow}>
                {row.map((r) => (
                  <TableCell
                    className={classes.tableCell}
                    onClick={() => handleClick(row[0])}
                  >
                    {r}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
