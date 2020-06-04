import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IoIosArrowBack } from "react-icons/io";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import bg from "../../../assets/bgs/lab-bg.png";

import {
  Container,
  RightPanel,
  Header,
  Title,
  Form,
  Input,
  LoginTextInput,
  ButtonLogin,
  LeftPanel,
} from "./styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: 30,
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: "#00b000",
    "&:hover": {
      backgroundColor: green[700],
    },
    height: "40px",
    width: "150px",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function SignUp({ history }) {
  const { signIn } = useAuth();
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  async function handleSignUp(event) {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    if (password === confirmPassword && password && confirmPassword) {
      const response = await api.post("/signup", {
        name: name,
        username: user,
        email: user,
        password: password,
      });
      history.push("/login");
    }
    setSuccess(true);
    setLoading(false);
  }

  return (
    <Container>
      <LeftPanel>
        <img src={bg} />
      </LeftPanel>
      <RightPanel>
        <section>
          <Header>
            <h3>Criar conta</h3>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => history.push("/login")}
            >
              <IoIosArrowBack size={22} /> Voltar ao Login
            </Button>
          </Header>
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
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={
                  !name || !user || !password || !confirmPassword || loading
                }
                style={{
                  width: "150px",
                  backgroundColor: !loading ? "#00b000" : "#cecece",
                }}
                onClick={handleSignUp}
              >
                Aceder
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Form>
        </section>
      </RightPanel>
    </Container>
  );
}

export default SignUp;
