import React, { useState } from "react";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import {
  Container,
  RightPanel,
  Form,
  LoginTextInput,
  ButtonLogin,
} from "./styles";

function Login({ history }) {
  const { signIn } = useAuth();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();
    // console.log(user, password);

    const response = await api.post("/login", {
      email: user,
      password: password,
    });

    const { token } = response.data;
    if (typeof token === "undefined") {
      console.log("Redirect...");
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
      <RightPanel>
        <Form>
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
          <ButtonLogin onClick={handleLogin}>Login</ButtonLogin>
        </Form>
      </RightPanel>
    </Container>
  );
}

export default Login;
