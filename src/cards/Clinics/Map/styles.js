import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";

export const ZoomControl = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  z-index: 999;
`;

export const Theme = colors => {
  return createMuiTheme({
    palette: {
      primary: {
        main: "#00b000"
      }
    }
  });
};
