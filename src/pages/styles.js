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
  height: 100%;
  position: absolute;
  padding: 0;
  overflow: hidden;

  @media (min-width: 1550px) {
    width: CALC(100% - 250px);
    margin-left: 250px;
    padding-left: 0;
  }

  @media (min-width: 600px) and (max-width: 1549px) {
    width: CALC(100% - 150px);
    margin-left: 150px;
    padding-left: 0;
  }

  @media (max-width: 599px) {
    width: 100%;
    margin-left: 0;
    padding-left: 20px;
  }
`;

export const Content = styled.section`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 1550px) {
    padding: 0 5% 2% 0;
    height: CALC(100% - 80px);
  }

  @media (min-width: 600px) and (max-width: 1549px) {
    height: CALC(100% - 80px);
    padding: 0 2% 2% 0;
  }

  @media (max-width: 599px) {
    height: CALC(100% - 60px);
    padding: 0 2% 2% 0;
  }
`;
