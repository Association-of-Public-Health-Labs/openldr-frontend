import React, { useState, useEffect, useContext, memo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import hexToRgba from "hex-to-rgba";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";
import { Container, Header, Order, Description, Theme } from "./styles";

import reports from "../../../config/reports";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&$expanded": {
      border: "none",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    fontWeight: "bold",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  ExpansionPanel: {
    width: "100%",
    boxShadow: "none",
    border: "1px solid #ececec",
    borderRadius: 4,
    backgroundColor: "#f4f4f4",
    marginBottom: 4,
    "&.MuiExpansionPanel-root:before": {
      display: "none",
    },
  },
  hideBorder: {
    "&.MuiExpansionPanel-root:before": {
      display: "none",
    },
  },
  ExpansionPanel2: {
    width: "100%",
    boxShadow: "none",
    border: "none",
    padding: 0,
  },
  details: {
    padding: 0,
  },
  Grid: {
    padding: 10,
  },
  radio: {
    "&$checked": {
      color: "#00b000",
    },
  },
  checked: {},
  customArrow: {
    color: "#00b000",
  },
}));

const Reports = memo(({ active, handleChangeMenu }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState("panel-samples");
  const [value, setValue] = useState(null);
  const { colors } = useContext(ThemeContext);
  // const { handleChangeMenu } = useContext(ContextProvider);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(panel);
    setValue(null);
  };

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
    handleChangeMenu(event.target.value);
  };

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
      key={1}
    >
      <Container>
        <Header>
          <Order>1</Order>
          <Description>
            <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
          </Description>
        </Header>
        {reports.map((report, index) => (
          <ExpansionPanel
            expanded={expanded === `panel-${report.id}`}
            onChange={handleChange(`panel-${report.id}`)}
            className={classes.ExpansionPanel}
            defaultExpanded={true}
            key={index}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}bh-content`}
              id={`panel${index + 1}bh-header`}
            >
              <Typography className={classes.heading}>
                {report.label}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label={report.id}
                  name={report.id}
                  value={value}
                  onChange={handleChangeRadio}
                >
                  {report.options.map((option, i) => (
                    <FormControlLabel
                      value={option.id}
                      control={
                        <Radio
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                          size="small"
                        />
                      }
                      label={option.label}
                      key={i}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Container>
    </HtmlTooltip>
  );
});

export default Reports;

// export default function Reports({ active }) {
//   const classes = useStyles();
//   const [expanded, setExpanded] = useState("panel-samples");
//   const [value, setValue] = useState(null);
//   const { colors } = useContext(ThemeContext);
//   const { handleChangeMenu } = useContext(ContextProvider);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(panel);
//     setValue(null);
//   };

//   const handleChangeRadio = (event) => {
//     setValue(event.target.value);
//     handleChangeMenu(expanded, event.target.value);
//   };

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
//       key={1}
//     >
//       <Container isActive={active}>
//         <Header>
//           <Order>1</Order>
//           <Description>
//             <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
//           </Description>
//         </Header>
//         {reports.map((report, index) => (
//           <ExpansionPanel
//             expanded={expanded === `panel-${report.id}`}
//             onChange={handleChange(`panel-${report.id}`)}
//             className={classes.ExpansionPanel}
//             defaultExpanded={true}
//             key={index}
//           >
//             <ExpansionPanelSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel${index + 1}bh-content`}
//               id={`panel${index + 1}bh-header`}
//             >
//               <Typography className={classes.heading}>
//                 {report.label}
//               </Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   aria-label={report.id}
//                   name={report.id}
//                   value={value}
//                   onChange={handleChangeRadio}
//                 >
//                   {report.options.map((option, i) => (
//                     <FormControlLabel
//                       value={option.id}
//                       control={
//                         <Radio
//                           classes={{
//                             root: classes.radio,
//                             checked: classes.checked,
//                           }}
//                           size="small"
//                         />
//                       }
//                       label={option.label}
//                       key={i}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//         ))}
//       </Container>
//     </HtmlTooltip>
//   );
// }
