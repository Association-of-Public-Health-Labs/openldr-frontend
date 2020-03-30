import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  margin-right: 10px;
  @media (min-width: 600px) {
    display: none;
  }

  @media (max-width: 599px) {
    display: block;
  }
`;

export const MenuContainer = styled.div`
  padding: 15px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-color: ${props => props.theme.colors.background.secondary};
`;

export const Item = styled.a`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  color: #aaaaaa;
  text-decoration: none;
  span {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 5px;
  }
  &.active {
    color: #00b000;
    background-color: ${hexToRgba("#00b000", "0.08")};
  }
  &:hover {
    background-color: ${hexToRgba("#00b000", "0.03")};
  }
`;

export const SecondaryPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
