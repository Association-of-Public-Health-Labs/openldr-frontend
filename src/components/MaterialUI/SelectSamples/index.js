import React, { useContext } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ThemeContext } from "styled-components";

import { Container, UseStyles } from "./styles";

export default function SelectSamples() {
  const { colors } = useContext(ThemeContext);
  const classes = UseStyles(colors);
  const [age, setAge] = React.useState("");

  const handleChange = event => {
    setAge(event.target.value);
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
          value={age}
          onChange={handleChange}
          className={classes.select}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>DBS</MenuItem>
          <MenuItem value={20}>Plasma</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
}
