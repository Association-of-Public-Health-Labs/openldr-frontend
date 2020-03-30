import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 20px;
  border-width: 1px;
  padding: 20px;
  position: relative;
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

export const Body = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
`;

export const Content = styled.div`
  opacity: ${props => (props.isExpanded ? 0 : 1)};
`;
