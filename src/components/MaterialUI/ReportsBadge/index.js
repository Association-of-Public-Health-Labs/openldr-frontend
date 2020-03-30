import React, { useContext } from "react";
import { FiLayers } from "react-icons/fi";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core";
import { ThemeContext } from "styled-components";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import Context from "../../../context";
import Card from "../../MainCard";
import ExportToExcel from "../../ExportMultipleExcels";

import {
  Container,
  DrawerContainer,
  Divider,
  DrawerHeader,
  DrawerTitle,
  DrawerOptions,
  DrawerCards,
  Theme
} from "./styles";

const useStyles = makeStyles({
  list: {
    width: 550
  },
  fullList: {
    width: "auto"
  },
  drawerButton: {
    textTransform: "unset",
    marginLeft: 10
  }
});

export default function ReportsBadge({ totalReports }) {
  const classes = useStyles();
  const { colors } = useContext(ThemeContext);
  const theme = Theme(colors);
  const { reports, handleRemoveAllReports } = useContext(Context);
  const anchor = "right";
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const StyledBadge = withStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${colors.background.primary}`,
      padding: "0 4px",
      color: "white"
    }
  })(Badge);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <React.Fragment>
          <IconButton onClick={toggleDrawer(anchor, true)} aria-label="cart">
            <StyledBadge badgeContent={totalReports} color="primary">
              <FiLayers size={18} />
            </StyledBadge>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className={classes.drawer}
            containerStyle={{ backgroundColor: "black" }}
          >
            <DrawerContainer
              className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom"
              })}
              role="presentation"
              // onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <DrawerHeader>
                <DrawerTitle>
                  <h3>{reports.length} relatorios adicionados</h3>
                </DrawerTitle>
                <DrawerOptions>
                  <Button
                    className={classes.drawerButton}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleRemoveAllReports();
                      toggleDrawer(anchor, false);
                    }}
                    disableElevation
                  >
                    Remover todos
                  </Button>
                  <ExportToExcel />
                </DrawerOptions>
              </DrawerHeader>
              <DrawerCards>
                {reports.map(report => (
                  <>
                    <Card
                      cardId={report[0].cardId}
                      cardTitle={report[0].cardTitle}
                      excelData={report[0].excelData}
                      excelLabels={report[0].excelLabels}
                      chartData={report[0].chartData}
                      chartLabels={report[0].chartLabels}
                    />
                    <Divider />
                  </>
                ))}
              </DrawerCards>
            </DrawerContainer>
          </Drawer>
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
}
