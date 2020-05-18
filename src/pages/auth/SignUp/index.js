import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import {
  Container,
  RightPanel,
  Form,
  Input,
  LoginTextInput,
  ButtonLogin,
} from "./styles";

function SignUp({ history }) {
  const { signIn } = useAuth();
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  async function handleSignUp(event) {
    event.preventDefault();
    if (password === confirmPassword && password && confirmPassword) {
      const response = await api.post("/signup", {
        name: name,
        username: user,
        email: user,
        password: password,
      });
      history.push("/login");
    }
  }

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Container>
      <RightPanel>
        <Form>
          <Input>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              placeholder="Insira o nome completo"
            />
          </Input>
          <Input>
            <input
              type="email"
              onChange={(event) => setUser(event.target.value)}
              placeholder="Insira o email"
            />
          </Input>
          <Input>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Insira a senha"
            />
          </Input>
          <Input>
            <input
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmar a senha"
            />
            <span>
              {password !== confirmPassword &&
                password &&
                confirmPassword &&
                "* As senhas inseridas sao diferentes"}
            </span>
          </Input>
          <ButtonLogin onClick={handleSignUp}>Criar a conta</ButtonLogin>

          <GoogleLogin
            clientId="580902680771-km8dhdl0hpbh00jnjgj9umalhmkdk4f3.apps.googleusercontent.com"
            buttonText="Autentique-se usando a conta do Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Form>
      </RightPanel>
    </Container>
  );
}

export default SignUp;
