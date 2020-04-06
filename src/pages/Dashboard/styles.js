import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: fixed;
  background-color: ${props => props.theme.colors.background.primary};
`;

export const MainPanel = styled.div`
  width: CALC(100% - 150px); 
  margin-left: 150px;
  height: 100%;
  position: absolute;
  padding: 0;
  overflow: hidden;
`;

export const Content = styled.section`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 2% 2% 0;
  height: CALC(100% - 80px);
`;

export const LeftGridPanel = styled.div`
  height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
