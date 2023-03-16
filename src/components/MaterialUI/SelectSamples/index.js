import React, { useContext } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ThemeContext } from "styled-components";

import { Container, UseStyles } from "./styles";

export default function SelectSamples({handleSampleType}) {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const [sample, setSample] = React.useState("DBS");

  const handleChange = event => {
    setSample(event.target.value);
    handleSampleType(event.target.value);
  };
  return (
    <Container>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel
          className={classes.inputLabel}
          id="demo-simple-select-filled-label"
        >
          Tipo de amostra
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sample}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="DBS">DBS</MenuItem>
          <MenuItem value="PL">Plasma</MenuItem>
          <MenuItem value="PSC">Plasma Seco</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}
