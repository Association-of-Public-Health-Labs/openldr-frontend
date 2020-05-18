import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background.secondary};
  height: 100%;
  padding: 10px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Order = styled.h1`
  font-size: 50px;
  line-height: 50px;
  padding: 0;
  margin-right: 6px;
  color: ${(props) => hexToRgba(props.theme.colors.text, "0.3")};
`;

export const Description = styled.div`
  padding-top: 5px;
  p {
    font-size: 13px;
  }
`;

export const ColumnTitle = styled.h5`
  margin-bottom: 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text};
`;
