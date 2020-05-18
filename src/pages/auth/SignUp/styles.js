import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
`;

export const RightPanel = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  margin-left: 50%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  /* input {
    min-width: 80%;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    color: #666;
  } */

  input::placeholder {
    color: #999;
  }
`;

export const Input = styled.div`
  min-width: 80%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    color: #666;
    width: 100%;
  }
`;

export const ButtonLogin = styled.button`
  margin-top: 40px;
  margin-bottom: 40px;
  border: 0;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  background: #00b000;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  animation: move 400ms;
  animation-delay: 250ms;
  animation-fill-mode: backwards;
  width: 60%;
`;
