import React from "react";
import Grid from "@material-ui/core/Grid";

import Menu from "../../components/Menus/CardFullMenu";

import { Container, Popup } from "./styles";

export default function MainPopup({ lab, content }) {
  return (
    <Container>
      <Popup>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Menu lab={lab} full={true} />
          </Grid>
          <Grid item xs={7}>
            {content}
          </Grid>
        </Grid>
      </Popup>
    </Container>
  );
}
