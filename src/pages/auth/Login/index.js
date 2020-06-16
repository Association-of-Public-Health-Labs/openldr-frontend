import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GoogleLogin from "react-google-login";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import clsx from "clsx";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";

import bg from "../../../assets/bgs/lab-bg.png";
import emblema from "../../../assets/imgs/emblema.png";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

import {
  Container,
  LeftPanel,
  RightPanel,
  Header,
  Logo,
  Form,
  LoginTextInput,
  ButtonLogin,
  AlertContainer,
  OrPanel,
  ButtonGoogleSign,
  LoginButtons,
} from "./styles";
import { setDayWithOptions } from "date-fns/fp";

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
  buttonSelectApp: {
    width: "250px",
  },
}));

function Login({ history }) {
  const { signIn } = useAuth();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginDenied, setLoginDenied] = useState(false);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [option, setOption] = useState({
    option: "covid19",
    name: "Covid-19 (SARS Cov2)",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChangeMenu(option, name) {
    setAnchorEl(null);
    setOption({ option: option, name: name });
  }

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  async function handleLogin(event) {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    const response = await api.post("/login", {
      email: user,
      password: password,
    });

    const { token } = response.data;
    if (typeof token === "undefined") {
      setLoginDenied(true);
      setTimeout(() => {
        setLoginDenied(false);
        setSuccess(true);
        setLoading(false);
      }, 3000);
    } else {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      await localStorage.setItem("@RAuth:user", user);
      await localStorage.setItem("@RAuth:token", token);

      setSuccess(true);
      setLoading(false);

      history.push(`/${option.option}`);
    }
  }

  const responseGoogle = async (response) => {
    const { tokenId, profileObj } = response;
    if (typeof tokenId === "undefined") {
      setLoginDenied(true);
      setTimeout(() => {
        setLoginDenied(false);
      }, 3000);
    } else {
      const { email } = profileObj;
      api.defaults.headers.Authorization = `Bearer ${tokenId}`;

      await localStorage.setItem("@RAuth:user", email);
      await localStorage.setItem("@RAuth:token", tokenId);

      history.push(`/${option.option}`);
    }
  };

  return (
    <Container>
      <LeftPanel>
        <img src={bg} />
      </LeftPanel>
      <RightPanel>
        <section>
          <Header>
            <Logo>
              <img src={emblema} />
              <h3>MISAU</h3>
            </Logo>
            <h3>Autenticação</h3>
          </Header>
          <Form>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              classeName={classes.buttonSelectApp}
              style={{
                maxWidth: 350,
                minWidth: 300,
                height: 48,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                borderWidth: 1,
                borderColor: "#dddddd",
                borderStyle: "solid",
                marginTop: 30,
              }}
            >
              <span>{option.name}</span> <IoIosArrowDown size={20} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() =>
                  handleChangeMenu("covid19", "Covid 19 (SARS Cov2)")
                }
              >
                Covid 19 (SARS Cov2)
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleChangeMenu("dashboard", "Carga Viral de HIV")
                }
              >
                Carga Viral de HIV
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleChangeMenu("dpi", "Diagnostico Precoce Infantil")
                }
              >
                Diagnostico Precoce Infantil
              </MenuItem>
            </Menu>
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
            <LoginButtons>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={buttonClassname}
                  disabled={loading}
                  style={{
                    width: "150px",
                    backgroundColor: !loading ? "#00b000" : "#cecece",
                  }}
                  onClick={handleLogin}
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
              <a href="/signup">Não possui conta?</a>
            </LoginButtons>
            {/* <OrPanel>
              <h5>ou</h5>
            </OrPanel>
            <GoogleLogin
              clientId="580902680771-km8dhdl0hpbh00jnjgj9umalhmkdk4f3.apps.googleusercontent.com"
              buttonText="Aceder usando a conta do Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              style={{ width: 350 }}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <ButtonGoogleSign
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle size={20} />
                  Aceder usando a conta do Google
                </ButtonGoogleSign>
              )}
            /> */}
          </Form>
        </section>
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
