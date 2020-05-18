import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";

import { Container, SamplesOptions, UseStyles } from "./styles";

export default function Gender() {
  const { colors } = useContext(ThemeContext);
  const { handleGetParams } = useContext(ContextProvider);
  const [state, setState] = useState({
    all: false,
    male: false,
    female: false,
    non_specified: false,
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
        male: event.target.checked,
        female: event.target.checked,
        non_specified: event.target.checked,
      });
    } else {
      setState({ ...state, [event.target.name]: event.target.checked });
    }
  };

  useEffect(() => {
    function loadChanges() {
      if (all || male || female || non_specified) {
        handleGetParams(state);
      } else {
        handleGetParams(null);
      }
    }
    loadChanges();
  }, [state]);

  const { all, male, female, non_specified } = state;

  return (
    <Container>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={male && female && non_specified}
              onChange={handleChange}
              name="all"
              classes={{
                root: classes.checkbox,
                checked: classes.checked,
              }}
            />
          }
          label="Todos tipos de gênero"
        />
        <SamplesOptions>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={male}
                  onChange={handleChange}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                  name="male"
                />
              }
              label="Masculino"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={female}
                  onChange={handleChange}
                  name="female"
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                />
              }
              label="Feminino"
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
              label="Gênero não especificado"
            />
          </FormGroup>
        </SamplesOptions>
      </FormGroup>
    </Container>
  );
}
