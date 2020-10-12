import styled from "styled-components";
import hexToRgba from "hex-to-rgba"

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Popup = styled.div`
  width: 95%;
  height: 95%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px 15px 30px 15px;
`

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: uppercase;
    color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
    margin-bottom: 5px;
    margin-right: 5px;
  }
`;