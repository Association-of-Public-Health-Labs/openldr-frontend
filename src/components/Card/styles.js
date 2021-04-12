import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: ${(props) => props.borderRadius};
  border-width: 1px;
  padding: 20px;
  position: relative;
`;

export const Content = styled.div`
  opacity: ${(props) => (props.isExpanded ? 0 : 1)};
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const CardLabels = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
  p {
    margin-right: 4px;
    font-size: 12px;
  }
`;

export const Label = styled.span`
  background-color: ${(props) => hexToRgba("#00b000", 0.1)};
  color: #00b000;
  padding: 5px;
  font-size: 12px;
  margin-right: 5px;
`;

export const AgeLabel = styled.span`
  background-color: ${(props) => hexToRgba("#f8a200", 0.1)};
  color: #f8a200;
  padding: 5px;
  font-size: 12px;
  margin-right: 5px;
`;
