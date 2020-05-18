import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { ThemeContext } from "styled-components";

import DatePicker from "../../MaterialUI/DatePicker";

import {
  Container,
  DateRangePanel,
  Label,
  Header,
  Order,
  Description,
} from "./styles";

export default function Date({ reportId, params, facilities }) {
  const [value, setValue] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDateRangeEnabled, setIsDateRangeEnabled] = useState(false);
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    function loadProps() {
      if (reportId && params && facilities) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }
    loadProps();
  }, [reportId, params, facilities]);

  const useStyles = makeStyles((theme) => ({
    radio: {
      "&$checked": {
        color: colors.primary,
      },
    },
    checked: {},
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsDateRangeEnabled(event.target.value === "dateRange");
  };

  const handleChangeStartDate = (startDate) => {};

  const handleChangeEndDate = (startDate) => {};

  return (
    <Container isEnabled={isEnabled}>
      <Header isEnabled={isEnabled}>
        <Order>4</Order>
        <Description>
          <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
        </Description>
      </Header>
      <FormControl
        component="fieldset"
        style={{ opacity: isEnabled ? 1 : 0.3 }}
        disabled={!isEnabled}
      >
        <FormLabel component="legend">Agrupar por</FormLabel>
        <RadioGroup
          aria-label="dates"
          name="dates"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="year"
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked,
                }}
                size="small"
              />
            }
            label="Ano"
          />
          <FormControlLabel
            value="quarter"
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked,
                }}
                size="small"
              />
            }
            label="Trimestre"
          />
          <FormControlLabel
            value="month"
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked,
                }}
                size="small"
              />
            }
            label="Mes"
          />
          <FormControlLabel
            value="week"
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked,
                }}
                size="small"
              />
            }
            label="Semana"
          />
          <FormControlLabel
            value="day"
            control={
              <Radio
                classes={{
                  root: classes.radio,
                  checked: classes.checked,
                }}
                size="small"
              />
            }
            label="Dia"
          />
        </RadioGroup>
      </FormControl>
      <DateRangePanel isEnabled={isEnabled && params}>
        <Label>Especificar o Intervalo</Label>
        <DatePicker handleDateRange={handleChangeStartDate} label="Inicio" />
        <DatePicker handleDateRange={handleChangeEndDate} label="Fim" />
      </DateRangePanel>
    </Container>
  );
}
