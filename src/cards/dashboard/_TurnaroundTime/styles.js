import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 20px;
  border-width: 1px;
  padding: 20px;
  position: relative;
  margin-bottom: 20px;
`;

export const Body = styled.div`
  /* padding-top: 20px; */
  width: 100%;
  height: 270px;
`;
