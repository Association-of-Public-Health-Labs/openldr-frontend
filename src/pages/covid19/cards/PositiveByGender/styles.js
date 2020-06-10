import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding: 0;
  margin-bottom: 20px;
`;

export const Progress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
`;
