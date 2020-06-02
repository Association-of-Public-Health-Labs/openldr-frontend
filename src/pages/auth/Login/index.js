import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import bg from "../../../assets/bgs/lab-bg.png";

import {
  Container,
  LeftPanel,
  RightPanel,
  Form,
  LoginTextInput,
  ButtonLogin,
  AlertContainer,
} from "./styles";

function Login({ history }) {
  const { signIn } = useAuth();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginDenied, setLoginDenied] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    console.log(user, password);

    const response = await api.post("/login", {
      email: user,
      password: password,
    });

    const { token } = response.data;
    if (typeof token === "undefined") {
      setLoginDenied(true);
      setTimeout(() => setLoginDenied(false), 3000);
    } else {
      // localStorage.setItem("token", token)
      // await signIn(user, password);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      await localStorage.setItem("@RAuth:user", JSON.stringify(user));
      await localStorage.setItem("@RAuth:token", token);
      history.push("/covid19");
    }
  }

  return (
    <Container>
      <LeftPanel>
        <img src={bg} />
      </LeftPanel>
      <RightPanel>
        <Form>
          <h2>Aceder a conta</h2>
          <input
            type="email"
            onChange={(event) => setUser(event.target.value)}
            placeholder="Insira o email"
          />
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Insira a senha"
          />
          <ButtonLogin onClick={handleLogin}>Entrar</ButtonLogin>
        </Form>
      </RightPanel>
      {loginDenied && (
        <AlertContainer>
          <Alert variant="filled" severity="error">
            Email e/ou senha incorrectos. Tente novamente!
          </Alert>
        </AlertContainer>
      )}
    </Container>
  );
}

export default Login;
