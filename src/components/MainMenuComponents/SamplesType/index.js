import React, { useState, useContext, useEffect, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";

import { Container, SamplesOptions, UseStyles } from "./styles";

const SamplesType = () => {
  const { colors } = useContext(ThemeContext);
  const { handleGetParams } = useContext(ContextProvider);
  const [state, setState] = useState({
    all: false,
    dbs: false,
    plasma: false,
    non_specified: false,
  });
  const { all, dbs, plasma, non_specified } = state;

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
        dbs: event.target.checked,
        plasma: event.target.checked,
        non_specified: event.target.checked,
      });
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };

  useEffect(() => {
    if (all || dbs || plasma || non_specified) {
      handleGetParams(state);
    } else {
      handleGetParams(null);
    }
  }, [state]);

  return (
    <Container>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={dbs && plasma && non_specified}
              onChange={handleChange}
              name="all"
              classes={{
                root: classes.checkbox,
                checked: classes.checked,
              }}
            />
          }
          label="Todos os tipos de amostras"
        />
        <SamplesOptions>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dbs}
                  onChange={handleChange}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                  name="dbs"
                />
              }
              label="Dry Blood Spot (DBS)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plasma}
                  onChange={handleChange}
                  name="plasma"
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                />
              }
              label="Plasma"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={non_specified}
                  onChange={handleChange}
                  name="non_specified"
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                />
              }
              label="Amostra não especificada"
            />
          </FormGroup>
        </SamplesOptions>
      </FormGroup>
    </Container>
  );
};

export default SamplesType;
