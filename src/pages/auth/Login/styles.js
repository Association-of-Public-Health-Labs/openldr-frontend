import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0;
  padding: 0;
`;

export const LeftPanel = styled.div`
  width: 60%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  img {
    width: 60%;
  }
`;

export const RightPanel = styled.div`
  width: 40%;
  height: 100%;
  position: absolute;
  margin-left: 60%;
  padding: 0;
  top: 0;
  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: relative;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 4%;
  padding-right: 4%;
  color: #333333;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 50px;
    margin-right: 10px;
  }
  h3 {
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;

  input {
    min-width: 300px;
    max-width: 350px;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    color: #666;
  }

  input::placeholder {
    color: #999;
  }
`;

export const ButtonLogin = styled.button`
  margin-top: 30px;
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

export const ButtonGoogleSign = styled.button`
  border: 0;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  font-family: Open Sans, sans-serif;
`;

export const OrPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-top: 30px;
  color: #333333;
`;

export const AlertContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const LoginButtons = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${(props) => props.theme.colors.primary};
    margin-top: 20px;
  }
`;
