import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Popup = styled.div`
  width: 80%;
  background-color: ${props => props.theme.colors.background.secondary};
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
`;
