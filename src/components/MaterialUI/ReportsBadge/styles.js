import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";

export const Container = styled.div``;

export const DrawerContainer = styled.div`
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const DrawerHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const DrawerOptions = styled.div`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const DrawerTitle = styled.div`
  display: flex;
`;

export const DrawerCards = styled.div`
  /* height: CALC(100% - 60px); */
  width: 100%;
  /* margin-top: 40px; */
  overflow-y: auto;
  padding: 0px 20px 0px 20px;
`;

export const Divider = styled.div`
  margin-bottom: 20px;
`;

export const Theme = colors => {
  return createMuiTheme({
    palette: {
      primary: {
        main: colors.primary
      }
    },
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: colors.background.primary
        }
      }
    }
  });
};
