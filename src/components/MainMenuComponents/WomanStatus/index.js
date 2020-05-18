import React, { useState, useContext, useEffect, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";

import { Container, SamplesOptions } from "./styles";

export default function WomanStatus() {
  const { colors } = useContext(ThemeContext);
  const { handleGetParams } = useContext(ContextProvider);
  const [state, setState] = useState({
    all: false,
    pregnant: false,
    breastfeeding: false,
  });

  const useStyles = makeStyles({
    checkbox: {
      "&$checked": {
        color: colors.primary,
      },
    },
    checked: {},
  });
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.name === "all") {
      setState({
        pregnant: event.target.checked,
        breastfeeding: event.target.checked,
      });
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };

  useEffect(() => {
    function loadChanges() {
      if (all || pregnant || breastfeeding) {
        handleGetParams(state);
      } else {
        handleGetParams(null);
      }
    }
    loadChanges();
  }, [state]);

  const { all, pregnant, breastfeeding } = state;

  return (
    <Container>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={pregnant && breastfeeding}
              onChange={handleChange}
              name="all"
              classes={{
                root: classes.checkbox,
                checked: classes.checked,
              }}
            />
          }
          label="Mulheres Grávidas e Lactantes"
        />
        <SamplesOptions>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pregnant}
                  onChange={handleChange}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                  name="pregnant"
                />
              }
              label="Mulher Grávida"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={breastfeeding}
                  onChange={handleChange}
                  name="breastfeeding"
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                />
              }
              label="Mulher Lactante"
            />
          </FormGroup>
        </SamplesOptions>
      </FormGroup>
    </Container>
  );
}
