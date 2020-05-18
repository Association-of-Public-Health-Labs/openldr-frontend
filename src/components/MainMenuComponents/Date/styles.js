import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  background-color: ${(props) =>
    props.isEnabled
      ? props.theme.colors.background.secondary
      : props.theme.colors.background.primary};
  padding: 10px;
  height: 100%;
`;

export const DateRangePanel = styled.div`
  display: ${(props) => (props.isEnabled ? `block` : "none")};
`;

export const Label = styled.span`
  margin-bottom: 10px;
`;

export const Header = styled.div`
  opacity: ${(props) => (props.isEnabled ? 1 : 0.3)};
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
