import styled from "styled-components";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;

  @media (min-width: 1550px) {
    height: 80px;
    padding: 2% 5% 2% 0;
  }

  @media (min-width: 600px) and (max-width: 1549px) {
    height: 80px;
    padding: 2% 2% 2% 0;
  }

  @media (max-width: 599px) {
    height: 60px;
    padding: 6% 2% 2% 0;
  }
`;

export const Title = styled.h2`
  @media (min-width: 600px) {
    margin-left: 0px;
  }

  @media (max-width: 599px) {
    margin-left: 0px;
  }
`;

export const Search = styled.div``;

export const Panel = styled.div`
  width: 100%;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: 599px) {
    display: none;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const MobileMenu = styled.div`
  margin-right: 10px;
  @media (min-width: 600px) {
    display: none;
  }

  @media (max-width: 599px) {
    display: block;
  }
`;

export const UseStyles = makeStyles({
  buttonDateRangePicker: {
    color: "white",
    fontWeight: "normal",
    textTransform: "unset"
  },
  buttonApply: {
    color: "white",
    fontWeight: "normal",
    textTransform: "unset"
  },
  dateRangePicker: {
    borderColor: "white",
    color: "white"
  },
  buttonDashboardType: {
    marginLeft: 20
  }
});

export const Theme = theme =>
  createMuiTheme({
    palette: {
      primary: {
        main: theme.primary
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00"
      },
      normal: {
        main: theme.primary
      },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  });
