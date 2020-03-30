import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const CardMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button.card-menu-options {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.background.primary};
    border: none;
    margin-right: 5px;
    outline: none;
    color: ${props => props.theme.colors.text};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  button.active {
    background-color: #00b000;
    color: white;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: uppercase;
    color: ${props => hexToRgba(props.theme.colors.text, "0.4")};
    margin-bottom: 5px;
  }
`;

export const MenuButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #efefef;
  border: none;
  margin-left: 5px;
  outline: none;
`;
