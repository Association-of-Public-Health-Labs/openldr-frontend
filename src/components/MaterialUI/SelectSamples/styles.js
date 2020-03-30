import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
`;

export const UseStyles = makeStyles({
  formControl: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: props => props.background.textInput,
    color: props => props.text,
    borderRadius: 5
  },
  inputLabel: {
    color: props => hexToRgba(props.text, "0.6")
  },
  select: {
    color: props => props.text
  }
});
