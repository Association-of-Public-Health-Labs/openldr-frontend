import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div``;

export const DateRangePanel = styled.div`
  min-width: 250px;
  height: 200px;
  background-color: ${props => props.theme.colors.background.secondary};
  display: flex;
  flex-direction: column;
  padding: 20px;
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
