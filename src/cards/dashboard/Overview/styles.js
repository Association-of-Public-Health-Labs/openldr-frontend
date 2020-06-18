import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.background.secondary};
  height: 122px;
  padding: 0;
  border-radius: 0.375rem;
  position: relative;
  padding: 20px;
`;

export const ChartCanvas = styled.div`
  position: absolute;
  right: 0px;
  bottom: 20px;
  z-index: 9;
  width: 50%;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    margin-bottom: 10px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.text};
  }
  h2 {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const PeriodLabel = styled.span`
  position: absolute;
  left: 20px;
  bottom: 10px;
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
`;

export const useStyles = makeStyles((theme) => ({
  grid: {},
}));
