import React, { useState, useContext, memo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { ThemeContext } from "styled-components";
import reports from "../../../config/reports";
import ContextProvider from "../../../context";
import { Container, Header, Order, Description } from "./styles";

const Params = memo(({ active, reportId }) => {
  const { colors } = useContext(ThemeContext);
  const useStyles = makeStyles((theme) => ({
    customArrow: {
      color: colors.primary,
    },
  }));
  const classes = useStyles();

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: colors.primary,
      color: "white",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${colors.primary}`,
    },
    arrow: {},
  }))(Tooltip);

  function getMenu() {
    return reports.map((report) => {
      return report.options.map((option, key) => {
        if (option.id === reportId) {
          // return option.menu(handleGetParams);
          return option.menu(null, key);
        }
      });
    });
  }

  return (
    <HtmlTooltip
      title={
        <>
          <p>
            Para avancar para o passo seguinte e necessario selecionar o
            relatorio que deseja gerar
          </p>
        </>
      }
      arrow
      open={active}
      classes={{ arrow: classes.customArrow }}
    >
      <Container>
        <Header>
          <Order>2</Order>
          <Description>
            <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
          </Description>
        </Header>
        {getMenu()}
      </Container>
    </HtmlTooltip>
  );
});
export default Params;

// export default function Params({ active, reportId }) {
//   const { colors } = useContext(ThemeContext);
//   const useStyles = makeStyles((theme) => ({
//     customArrow: {
//       color: colors.primary,
//     },
//   }));
//   const classes = useStyles();

//   const HtmlTooltip = withStyles((theme) => ({
//     tooltip: {
//       backgroundColor: colors.primary,
//       color: "white",
//       maxWidth: 220,
//       fontSize: theme.typography.pxToRem(12),
//       border: `1px solid ${colors.primary}`,
//     },
//     arrow: {},
//   }))(Tooltip);

//   function getMenu() {
//     return reports.map((report) => {
//       return report.options.map((option, key) => {
//         if (option.id === reportId) {
//           // return option.menu(handleGetParams);
//           return option.menu(null, key);
//         }
//       });
//     });
//   }

//   return (
//     <HtmlTooltip
//       title={
//         <>
//           <p>
//             Para avancar para o passo seguinte e necessario selecionar o
//             relatorio que deseja gerar
//           </p>
//         </>
//       }
//       arrow
//       open={active}
//       classes={{ arrow: classes.customArrow }}
//     >
//       <Container active={active} isEnabled={reportId}>
//         <Header isEnabled={reportId}>
//           <Order>2</Order>
//           <Description>
//             <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
//           </Description>
//         </Header>
//         {getMenu()}
//       </Container>
//     </HtmlTooltip>
//   );
// }
