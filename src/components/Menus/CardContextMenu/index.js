import React, { useState, useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExportToExcel from "../../ExportToExcel";
import convertCardToImage from "../../../utils/htmlToImage";
import Context from "../../../context";

import { Container } from "./styles";

export default function CardContextMenu(props) {
  const { cardId } = useContext(Context);
  function handleExportImage() {
    props.handleClose();
    convertCardToImage(cardId);
  }
  return (
    <Container>
      <Menu
        keepMounted
        open={props.state.mouseY !== null}
        onClose={props.handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          props.state.mouseY !== null && props.state.mouseX !== null
            ? { top: props.state.mouseY, left: props.state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={props.handleClose} style={{ padding: 0 }}>
          <ExportToExcel />
        </MenuItem>
        <MenuItem onClick={handleExportImage}>Baixar o grafico</MenuItem>
        <MenuItem onClick={props.handleClose} disabled>
          Adicionar o relatorio
        </MenuItem>
      </Menu>
    </Container>
  );
}
