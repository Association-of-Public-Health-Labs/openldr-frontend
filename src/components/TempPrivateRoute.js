import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export default function TempPrivateRoute({ component: Component, ...rest }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function loadUser() {
      const email = await localStorage.getItem("@RAuth:user");
      const key_token = await localStorage.getItem("@RAuth:token");
      setUser(email);
      setToken(key_token);
    }
    loadUser();
  }, [user]);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() &&
        user !== "cer9@cdc.gov" &&
        user !== "ralph.timperi@aphl.org" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
