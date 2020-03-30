import styled from "styled-components";

export const Container = styled.div``;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 200px;
  height: 40px;
  text-align: left;
  padding-left: 17px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;
