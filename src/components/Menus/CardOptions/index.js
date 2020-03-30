import React, { useState, useContext } from "react";
import { ThemeProvider, IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ThemeContext } from "styled-components";
import Context from "../../../context";
import convertCardToImage from "../../../utils/htmlToImage";

import ExportToExcel from "../../ExportToExcel";

import { Container, Theme } from "./styles";

const ITEM_HEIGHT = 48;

export default function CardOptions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  const { cardId, handleAddReport } = useContext(Context);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleExportImage() {
    setAnchorEl(null);
    convertCardToImage(cardId);
  }

  function handleAddReportIntoFolder() {
    setAnchorEl(null);
    handleAddReport();
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="medium"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem onClick={handleClose} style={{ padding: 0 }}>
            <ExportToExcel />
          </MenuItem>
          <MenuItem onClick={handleExportImage}>Baixar o grafico</MenuItem>
          <MenuItem onClick={handleAddReportIntoFolder} disabled>
            Adicionar o relatorio
          </MenuItem>
        </Menu>
      </ThemeProvider>
    </Container>
  );
}
