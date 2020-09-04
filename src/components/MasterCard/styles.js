import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: ${props => props.height};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.borderRadius};
  border-width: 1px;
  padding: 20px;
  position: relative;
`;

export const Content = styled.div`
  opacity: ${props => (props.isExpanded ? 0 : 1)};
`;
