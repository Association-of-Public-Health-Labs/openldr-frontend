import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";
import AgeRange from "../../MaterialUI/AgeRange";

import { Container, SpecifyAge, AgeGroups } from "./styles";

export default function Age() {
  const [value, setValue] = useState(null);
  const [age, setAge] = useState([]);
  const { colors } = useContext(ThemeContext);
  const { handleGetParams } = useContext(ContextProvider);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setIsAgeEditable(event.target.value === "specifyAge");
    setIsAgeGroup(event.target.value === "ageGroup");
  };

  const [isAgeEditable, setIsAgeEditable] = useState(false);
  const [isAgeGroup, setIsAgeGroup] = useState(false);
  const [state, setState] = useState({
    less_than_2: true,
    between_2_and_5: true,
    between_6_14: true,
    between_15_49: true,
    greater_or_equal_50: true,
    non_specified: true,
  });

  const useStyles = makeStyles((theme) => ({
    radio: {
      "&$checked": {
        color: colors.primary,
      },
    },
    checked: {},
  }));

  const classes = useStyles();

  const handleChange = (event, checked) => {
    setValue(false);
    setIsAgeEditable(checked);
    setState({
      less_than_2: false,
      between_2_and_5: false,
      between_6_14: false,
      between_15_49: false,
      greater_or_equal_50: false,
      non_specified: false,
    });
  };

  const handleChangeAgeGroups = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setIsAgeEditable(false);
  };

  const {
    less_than_2,
    between_2_and_5,
    between_6_14,
    between_15_49,
    greater_or_equal_50,
    non_specified,
  } = state;

  useEffect(() => {
    function loadChanges() {
      if (isAgeGroup) {
        if (
          less_than_2 ||
          between_2_and_5 ||
          between_6_14 ||
          between_15_49 ||
          greater_or_equal_50 ||
          non_specified
        ) {
          handleGetParams(state);
        } else {
          handleGetParams(null);
        }
      }
      if (isAgeEditable) {
        if (age.start && age.end) {
          handleGetParams(age);
        } else {
          handleGetParams(null);
        }
      }
    }
    loadChanges();
  }, [isAgeGroup, state, age]);

  const handleGetAge = (param) => {
    setAge(param);
  };

  return (
    <Container>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="age"
          name="age"
          value={value}
          onChange={handleRadioChange}
        >
          <AgeGroups isAgeGroup={isAgeGroup}>
            <FormControlLabel
              value="ageGroup"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Agrupar por idade"
            />
            <div className="age-group-checkboxes">
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={less_than_2}
                        onChange={handleChangeAgeGroups}
                        name="less_than_2"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="< 2 anos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={between_2_and_5}
                        onChange={handleChangeAgeGroups}
                        name="between_2_and_5"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="2-5 anos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={between_6_14}
                        onChange={handleChangeAgeGroups}
                        name="between_6_14"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="6-14 anos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={between_15_49}
                        onChange={handleChangeAgeGroups}
                        name="between_15_49"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="15-49 anos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={greater_or_equal_50}
                        onChange={handleChangeAgeGroups}
                        name="greater_or_equal_50"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="+50 anos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={non_specified}
                        onChange={handleChangeAgeGroups}
                        name="non_specified"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Idade não especificada"
                  />
                </FormGroup>
              </FormControl>
            </div>
          </AgeGroups>
          <SpecifyAge isAgeEditable={isAgeEditable}>
            <FormControlLabel
              value="specifyAge"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Especificar o intervalo de idade"
            />
            {isAgeEditable && <AgeRange handleGetAge={handleGetAge} />}
          </SpecifyAge>
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
