import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import { ThemeContext } from "styled-components";

import { Container } from "./styles";

export default function AgeRange({ start, end, handleGetAge, label }) {
  const [ageStart, setAgeStart] = useState(start);
  const [ageEnd, setAgeEnd] = useState(end);
  const { colors } = useContext(ThemeContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      // "& .MuiTextField-root": {
      //   margin: theme.spacing(1),
      width: "100%",
      // }
    },
    focused: {},
    outlinedInput: {
      "&$focused $notchedOutline": {
        border: `2px solid ${colors.primary}`,
      },
    },
    notchedOutline: {},
  }));
  const classes = useStyles();

  const handleChangeAgeStart = (event) => {
    setAgeStart(event.target.value);
    return handleGetAge({ start: event.target.value, end: ageEnd });
  };

  const handleChangeAgeEnd = (event) => {
    setAgeEnd(event.target.value);
    return handleGetAge({ start: ageStart, end: event.target.value });
  };

  return (
    <Container>
      {label && <span className="title">Insira a faixa etária</span>}
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" className={classes.root}>
            <InputLabel htmlFor="start-age">Inicio</InputLabel>
            <OutlinedInput
              id="start-age"
              value={ageStart}
              onChange={handleChangeAgeStart}
              label="Name"
              style={{
                backgroundColor: colors.background.textInput,
                color: colors.text,
              }}
              type="number"
              classes={{
                root: classes.outlinedInput,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" size="small" className={classes.root}>
            <InputLabel htmlFor="end-age">Fim</InputLabel>
            <OutlinedInput
              id="end-age"
              value={ageEnd}
              onChange={handleChangeAgeEnd}
              label="Name"
              style={{
                backgroundColor: colors.background.textInput,
                color: colors.text,
              }}
              type="number"
              classes={{
                root: classes.outlinedInput,
                focused: classes.focused,
                notchedOutline: classes.notchedOutline,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
